'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useLocale, useMessages } from 'next-intl'

const BODY_BG = '#1a0e10'
const VIDEO_FADE_SECONDS = 4.5
const DARK_HOLD_MS = 700
const IMAGE_FADE = 'opacity 2.8s cubic-bezier(0.22, 1, 0.36, 1)'

type HeroBackdropProps = {
  imageUrl?: string
  videoUrl?: string
  /** Soft gradient when no image */
  fallback?: 'home' | 'page'
  overlay?: 'home' | 'page' | 'page-blend'
  ariaLabel?: string
  imagePosition?: string
}

export function HeroBackdrop({
  imageUrl,
  videoUrl,
  fallback = 'page',
  overlay = 'page',
  ariaLabel,
  imagePosition = 'center center',
}: HeroBackdropProps) {
  const locale = useLocale()
  const messages = useMessages()
  const reduce = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const endedRef = useRef(false)
  const holdTimerRef = useRef<number>(0)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const showVideo = Boolean(videoUrl) && !reduce

  useEffect(() => {
    const video = videoRef.current
    const frame = frameRef.current
    if (!video || !frame || !showVideo) return

    let raf = 0

    const applyVideoFade = () => {
      const opacity = videoFadeOpacity(video.currentTime, video.duration)
      video.style.opacity = String(opacity)
      video.style.filter = `brightness(${0.2 + 0.8 * opacity})`
    }

    const tick = () => {
      applyVideoFade()
      if (!video.paused && !video.ended) raf = requestAnimationFrame(tick)
    }

    const tryPlay = () => {
      if (userPausedRef.current || endedRef.current || document.hidden) return
      void video.play().catch(() => {
        setPlaying(false)
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause()
        else tryPlay()
      },
      { threshold: 0.35 },
    )
    observer.observe(frame)

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else tryPlay()
    }

    const onPlay = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    const onPauseOrEnd = () => {
      cancelAnimationFrame(raf)
      applyVideoFade()
    }

    document.addEventListener('visibilitychange', onVisibility)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPauseOrEnd)
    video.addEventListener('ended', onPauseOrEnd)
    video.addEventListener('seeked', applyVideoFade)
    video.addEventListener('loadedmetadata', applyVideoFade)

    applyVideoFade()
    tryPlay()

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(holdTimerRef.current)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPauseOrEnd)
      video.removeEventListener('ended', onPauseOrEnd)
      video.removeEventListener('seeked', applyVideoFade)
      video.removeEventListener('loadedmetadata', applyVideoFade)
    }
  }, [showVideo, videoUrl])

  const hideStill = () => {
    window.clearTimeout(holdTimerRef.current)
    const still = imageRef.current
    if (!still) return
    still.style.transition = 'none'
    still.style.opacity = '0'
  }

  const revealStill = () => {
    window.clearTimeout(holdTimerRef.current)
    holdTimerRef.current = window.setTimeout(() => {
      const still = imageRef.current
      if (!still) return
      still.style.transition = IMAGE_FADE
      still.style.opacity = '1'
    }, DARK_HOLD_MS)
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return

    if (endedRef.current) {
      endedRef.current = false
      userPausedRef.current = false
      setEnded(false)
      hideStill()
      video.style.opacity = '1'
      video.style.filter = 'brightness(1)'
      video.currentTime = 0
      void video.play()
      return
    }

    if (video.paused) {
      userPausedRef.current = false
      void video.play()
    } else {
      userPausedRef.current = true
      video.pause()
    }
  }

  const controlLabel = showVideo
    ? videoControlLabel(messages, locale, ended ? 'replayVideo' : playing ? 'pauseVideo' : 'playVideo')
    : ''

  const fallbackBg =
    fallback === 'home'
      ? 'linear-gradient(to bottom right, #0e0503, #1a0e10, #2a1208)'
      : 'linear-gradient(135deg, #0e0503 0%, #1a0805 40%, #2a1208 100%)'

  const overlayBg =
    overlay === 'home'
      ? [
          'linear-gradient(90deg, rgba(26,14,16,0.88) 0%, rgba(26,14,16,0.72) 34%, rgba(26,14,16,0.42) 62%, rgba(26,14,16,0.28) 100%)',
          'linear-gradient(180deg, rgba(26,14,16,0.32) 0%, rgba(26,14,16,0.1) 30%, rgba(26,14,16,0.22) 100%)',
        ].join(', ')
      : overlay === 'page-blend'
        ? 'linear-gradient(180deg, rgba(26,14,16,0.42) 0%, rgba(26,14,16,0.52) 42%, rgba(26,14,16,0.78) 72%, rgba(26,14,16,0.96) 90%, #1a0e10 100%)'
        : // Page heroes: body-toned veil so photos sit in the same palette as the site
          'linear-gradient(180deg, rgba(26,14,16,0.55) 0%, rgba(26,14,16,0.62) 45%, rgba(26,14,16,0.78) 100%)'

  const stillStyle: React.CSSProperties | undefined = imageUrl
    ? {
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: imagePosition,
        opacity: showVideo ? 0 : 1,
      }
    : undefined

  return (
    <>
      <motion.div
        ref={frameRef}
        aria-hidden={!ariaLabel || showVideo}
        role={ariaLabel && !showVideo ? 'img' : undefined}
        aria-label={showVideo ? undefined : ariaLabel}
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          background: showVideo ? BODY_BG : imageUrl ? BODY_BG : fallbackBg,
          transformOrigin: 'center center',
          willChange: 'opacity, transform',
        }}
      >
        {stillStyle && <div ref={imageRef} aria-hidden style={stillStyle} />}
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => {
              endedRef.current = true
              setEnded(true)
              setPlaying(false)
              if (videoRef.current) {
                videoRef.current.style.opacity = '0'
                videoRef.current.style.filter = 'brightness(0.2)'
              }
              revealStill()
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: imagePosition,
            }}
          >
            <source src={videoUrl} />
          </video>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayBg,
        }}
      />
      {showVideo && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={controlLabel}
          className="hero-video-toggle"
        >
          {ended ? (
            <ReplayIcon />
          ) : playing ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </button>
      )}
    </>
  )
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function videoFadeOpacity(currentTime: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return 1
  const fadeWindow = Math.min(VIDEO_FADE_SECONDS, duration)
  const remaining = duration - currentTime
  if (remaining >= fadeWindow) return 1
  if (remaining <= 0) return 0
  return easeInOutCubic(remaining / fadeWindow)
}

const VIDEO_CONTROL_FALLBACK = {
  en: {
    pauseVideo: 'Pause background video',
    playVideo: 'Play background video',
    replayVideo: 'Replay background video',
  },
  es: {
    pauseVideo: 'Pausar video de fondo',
    playVideo: 'Reproducir video de fondo',
    replayVideo: 'Volver a reproducir el video',
  },
} as const

function videoControlLabel(
  messages: ReturnType<typeof useMessages>,
  locale: string,
  key: keyof typeof VIDEO_CONTROL_FALLBACK.en,
) {
  const hero = messages.hero
  if (hero && typeof hero === 'object' && key in hero) {
    const value = (hero as Record<string, unknown>)[key]
    if (typeof value === 'string' && value.trim()) return value
  }
  return VIDEO_CONTROL_FALLBACK[locale === 'es' ? 'es' : 'en'][key]
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <rect x="3" y="2" width="3.5" height="12" rx="0.5" />
      <rect x="9.5" y="2" width="3.5" height="12" rx="0.5" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M4 2.8v10.4c0 .5.55.8.97.56l8.2-5.2a.65.65 0 0 0 0-1.12l-8.2-5.2A.65.65 0 0 0 4 2.8Z" />
    </svg>
  )
}

function ReplayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.2 8a4.8 4.8 0 1 1 .9 2.8M3.2 8V4.6M3.2 8h3.2"
      />
    </svg>
  )
}
