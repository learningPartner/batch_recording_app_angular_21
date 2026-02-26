import { Component, ElementRef, HostListener, OnDestroy, OnInit, inject, signal, ViewChild } from '@angular/core';
import { EnrollentService } from '../../core/services/enrollment/enrollent-service';
import { RecordingService } from '../../core/services/recording/recording-service';
import { User } from '../../core/services/user/user';
import { CandidateModel } from '../../core/model/classes/Candidate.Model';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
    __ytApiReadyPromise?: Promise<void>;
    __ytApiReadyResolver?: () => void;
  }
}

@Component({
  selector: 'app-candidate-session-record',
  imports: [],
  templateUrl: './candidate-session-record.html',
  styleUrl: './candidate-session-record.css',
})
export class CandidateSessionRecord implements OnInit, OnDestroy {

  enrollSrv = inject(EnrollentService);
  batchSrv = inject(RecordingService);
  userSrv = inject(User);
  enrollments = signal<any[]>([]);
  SessionRecordings = signal<any[]>([]);
  securityWarning = signal<string>('');
  watermarkText = signal<string>('');
  isModalOpen = signal(false);
  isPlaying = signal(false);
  isMuted = signal(false);
  @ViewChild('videoModal') videoModalRef!: ElementRef;
  private devToolsDetectorId: ReturnType<typeof setInterval> | null = null;
  private watermarkTickerId: ReturnType<typeof setInterval> | null = null;
  private devToolsHitCount = 0;
  private player: any | null = null;
  private isPlayerReady = false;
  private readonly videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  selectedBatchId = signal<number>(0)

  constructor() {
    this.userSrv.loggedUserData$.subscribe((res: CandidateModel) => {
      if (res?.candidateId) {
        this.getBatchesByCandiate(res.candidateId);
      }
    });
  }

  ngOnInit(): void {
    this.startDevToolsMonitoring();
  }

  ngOnDestroy(): void {
    if (this.devToolsDetectorId) {
      clearInterval(this.devToolsDetectorId);
    }

    if (this.watermarkTickerId) {
      clearInterval(this.watermarkTickerId);
    }
  }

  openModal(source: string) {
    const videoId = this.getVideoId(source);
    if (!videoId) {
      this.raiseSecurityWarning('Invalid video source. Please contact support.');
      return;
    }

    if (this.videoModalRef) {
      this.videoModalRef.nativeElement.style.display = 'block';
      this.isModalOpen.set(true);
      this.initYouTubePlayer(videoId);
      this.startWatermarkTicker();
    }
  }

  getVideoId(source: string): string | null {
    if (!source) {
      return null;
    }

    const input = source.trim();
    if (this.videoIdRegex.test(input)) {
      return input;
    }

    const fromPattern = input.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (fromPattern?.[1]) {
      return fromPattern[1];
    }

    try {
      const parsed = new URL(input);
      if (parsed.hostname.includes('youtu.be')) {
        const id = parsed.pathname.replace('/', '').slice(0, 11);
        return this.videoIdRegex.test(id) ? id : null;
      }

      const v = parsed.searchParams.get('v');
      if (v && this.videoIdRegex.test(v)) {
        return v;
      }
    } catch {
      return null;
    }

    return null;
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isPlaying.set(false);
    this.pausePlayer();
    if (this.videoModalRef) {
      this.videoModalRef.nativeElement.style.display = 'none';
    }
    if (this.watermarkTickerId) {
      clearInterval(this.watermarkTickerId);
      this.watermarkTickerId = null;
    }
  }

  getBatchesByCandiate(id: number) {
    this.enrollSrv.getEnrolledBatcheByCandidateId(id).subscribe({
      next: (res: any) => {
        this.enrollments.set(res.data);
        debugger;
        if(this.enrollments().length != 0) {
          this.getSessionRecordings(this.enrollments()[0].batchId)
        }
      },
    });
  }

  getSessionRecordings(bId: number) {
    this.selectedBatchId.set(bId);
    this.batchSrv.getAllSessionRecordingByBatchId(bId).subscribe({
      next: (res: any) => {
        this.SessionRecordings.set(res.data);
      },
    });
  }

  blockContextMenu(event: MouseEvent) {
    if (this.isModalOpen()) {
      event.preventDefault();
      this.raiseSecurityWarning('Right-click is disabled while video is playing.');
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onGlobalContextMenu(event: MouseEvent) {
    this.blockContextMenu(event);
  }

  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    if (this.isModalOpen()) {
      event.preventDefault();
      this.raiseSecurityWarning('Copy action is disabled while video is playing.');
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.isModalOpen()) {
      return;
    }

    const key = event.key.toLowerCase();
    const isBlockedShortcut =
      event.key === 'F12' ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) ||
      (event.ctrlKey && ['u', 's', 'p'].includes(key));

    if (isBlockedShortcut) {
      event.preventDefault();
      event.stopPropagation();
      this.raiseSecurityWarning('Restricted action detected. Video closed for safety.');
      this.closeModal();
    }
  }

  togglePlayback() {
    if (!this.isPlayerReady || !this.player) {
      this.raiseSecurityWarning('Player is not ready yet. Try again in a moment.');
      return;
    }

    if (this.isPlaying()) {
      this.pausePlayer();
      return;
    }

    this.player.playVideo();
    this.isPlaying.set(true);
  }

  toggleMute() {
    if (!this.isPlayerReady || !this.player) {
      return;
    }

    if (this.player.isMuted()) {
      this.player.unMute();
      this.isMuted.set(false);
      return;
    }

    this.player.mute();
    this.isMuted.set(true);
  }

  seekBy(seconds: number) {
    if (!this.isPlayerReady || !this.player) {
      return;
    }

    const current = Number(this.player.getCurrentTime?.() ?? 0);
    const target = Math.max(0, current + seconds);
    this.player.seekTo(target, true);
  }

  private startDevToolsMonitoring() {
    this.devToolsDetectorId = setInterval(() => {
      const widthGap = window.outerWidth - window.innerWidth;
      const heightGap = window.outerHeight - window.innerHeight;
      const mayBeOpen = widthGap > 160 || heightGap > 160;

      if (!mayBeOpen) {
        this.devToolsHitCount = 0;
        return;
      }

      this.devToolsHitCount++;
      if (this.devToolsHitCount >= 2 && this.isModalOpen()) {
        this.raiseSecurityWarning('Developer tools detected. Video playback was stopped.');
        this.closeModal();
      }
    }, 1000);
  }

  private startWatermarkTicker() {
    this.refreshWatermark();
    if (this.watermarkTickerId) {
      clearInterval(this.watermarkTickerId);
    }

    this.watermarkTickerId = setInterval(() => {
      this.refreshWatermark();
    }, 15000);
  }

  private refreshWatermark() {
    const user = this.userSrv.loggedUserData$.value;
    const identity = user.fullName || user.email || `Candidate-${user.candidateId}`;
    const time = new Date().toLocaleString();
    this.watermarkText.set(`${identity} | ${time}`);
  }

  private raiseSecurityWarning(message: string) {
    this.securityWarning.set(message);
    setTimeout(() => {
      if (this.securityWarning() === message) {
        this.securityWarning.set('');
      }
    }, 3500);
  }

  private async initYouTubePlayer(videoId: string) {
    await this.ensureYouTubeApiReady();

    if (this.player && this.isPlayerReady) {
      this.player.cueVideoById(videoId);
      this.isPlaying.set(false);
      return;
    }

    this.isPlayerReady = false;
    this.player = new window.YT.Player('yt-player', {
      host: 'https://www.youtube-nocookie.com',
      videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        playsinline: 1,
        controls: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          this.isPlayerReady = true;
          this.isMuted.set(!!this.player?.isMuted?.());
          this.isPlaying.set(false);
          this.player.cueVideoById(videoId);
        },
        onStateChange: (event: any) => {
          const playerState = event?.data;
          const ytState = window.YT?.PlayerState;
          this.isPlaying.set(playerState === ytState?.PLAYING);
        },
      },
    });
  }

  private pausePlayer() {
    if (!this.player || !this.isPlayerReady) {
      return;
    }
    this.player.pauseVideo();
    this.isPlaying.set(false);
  }

  private async ensureYouTubeApiReady() {
    if (window.YT?.Player) {
      return;
    }

    if (!window.__ytApiReadyPromise) {
      window.__ytApiReadyPromise = new Promise<void>((resolve) => {
        window.__ytApiReadyResolver = resolve;
      });

      window.onYouTubeIframeAPIReady = () => {
        window.__ytApiReadyResolver?.();
      };

      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
      }
    }

    await window.__ytApiReadyPromise;
  }
}
