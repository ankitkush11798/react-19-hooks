'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import clsx from 'clsx';
import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

// --- Types ---
export interface VideoPlayerHandle {
    play: () => void;
    pause: () => void;
    reset: () => void;
    toggleMute: () => void;
    getStatus: () => string;
}

// --- Child Component (The Player) ---
const VideoPlayer = forwardRef<VideoPlayerHandle, { src: string }>((props, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // This is the magic: customize what the parent sees in the 'ref'
    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current?.play();
            setIsPlaying(true);
        },
        pause() {
            videoRef.current?.pause();
            setIsPlaying(false);
        },
        reset() {
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.pause();
            }
            setIsPlaying(false);
        },
        toggleMute() {
            if (videoRef.current) {
                videoRef.current.muted = !videoRef.current.muted;
                setIsMuted(videoRef.current.muted);
            }
        },
        getStatus() {
            return isPlaying ? 'Playing' : 'Paused';
        }
    }));

    return (
        <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-[var(--glass-border)] shadow-2xl">
            <video
                ref={videoRef}
                src={props.src}
                className="w-full h-full object-cover opacity-80"
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* Overlay Status */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-[10px] font-mono border border-white/10 flex items-center gap-2">
                <div className={clsx("w-2 h-2 rounded-full", isPlaying ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                {isPlaying ? 'ON AIR' : 'OFFLINE'}
            </div>

            {/* Center Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                        <Play fill="white" className="ml-1" />
                    </div>
                </div>
            )}

            {/* Mute Indicator */}
            {isMuted && (
                <div className="absolute bottom-4 right-4 bg-red-500/80 p-2 rounded-full text-white">
                    <VolumeX size={16} />
                </div>
            )}
        </div>
    );
});

VideoPlayer.displayName = 'VideoPlayer';

// --- Parent Component (Remote Control) ---
export function VideoPlayerDemo() {
    const playerRef = useRef<VideoPlayerHandle>(null);
    const [lastAction, setLastAction] = useState('Initialized');

    const handlePlay = () => {
        playerRef.current?.play();
        setLastAction('Exectued: .play()');
    };

    const handlePause = () => {
        playerRef.current?.pause();
        setLastAction('Executed: .pause()');
    };

    const handleReset = () => {
        playerRef.current?.reset();
        setLastAction('Executed: .reset()');
    };

    const handleMute = () => {
        playerRef.current?.toggleMute();
        setLastAction('Executed: .toggleMute()');
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Child: The Player */}
            <VideoPlayer
                ref={playerRef}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />

            {/* Parent: The Remote */}
            <GlassCard className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Maximize className="text-[var(--accent-cyan)]" />
                    Parent Remote Control
                </h3>

                <p className="text-sm text-[var(--text-secondary)]">
                    This parent component controls the child video player via a
                    <strong> custom imperative API </strong> exposed through the ref, rather than accessing the raw
                    <code>HTMLVideoElement</code>.
                </p>

                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handlePlay} className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] hover:bg-[var(--accent-success)]/20 hover:border-[var(--accent-success)]/50 transition-all flex flex-col items-center gap-2 group">
                        <Play size={24} className="group-hover:text-[var(--accent-success)]" />
                        <span className="text-xs font-mono">player.play()</span>
                    </button>

                    <button onClick={handlePause} className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all flex flex-col items-center gap-2 group">
                        <Pause size={24} className="group-hover:text-yellow-400" />
                        <span className="text-xs font-mono">player.pause()</span>
                    </button>

                    <button onClick={handleReset} className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] hover:bg-red-500/20 hover:border-red-500/50 transition-all flex flex-col items-center gap-2 group">
                        <RotateCcw size={24} className="group-hover:text-red-400" />
                        <span className="text-xs font-mono">player.reset()</span>
                    </button>

                    <button onClick={handleMute} className="p-4 rounded-lg bg-[var(--glass-surface)] border border-[var(--glass-border)] hover:bg-[var(--accent-violet)]/20 hover:border-[var(--accent-violet)]/50 transition-all flex flex-col items-center gap-2 group">
                        <Volume2 size={24} className="group-hover:text-[var(--accent-violet)]" />
                        <span className="text-xs font-mono">player.toggleMute()</span>
                    </button>
                </div>

                <div className="p-3 bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded font-mono text-xs text-[var(--accent-cyan)]">
                    &gt; {lastAction}
                </div>
            </GlassCard>
        </div>
    );
}
