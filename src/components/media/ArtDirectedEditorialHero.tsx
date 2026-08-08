import { getImageProps } from 'next/image'

type Props = {
  desktopSrc: string
  mobileSrc: string
  alt: string
  desktopWidth: number
  desktopHeight: number
  mobileWidth: number
  mobileHeight: number
  className?: string
}

export function ArtDirectedEditorialHero({
  desktopSrc,
  mobileSrc,
  alt,
  desktopWidth,
  desktopHeight,
  mobileWidth,
  mobileHeight,
  className = 'absolute inset-0 h-full w-full object-cover',
}: Props) {
  const common = {
    alt,
    sizes: '100vw',
    loading: 'eager' as const,
    fetchPriority: 'high' as const,
  }
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: desktopSrc,
    width: desktopWidth,
    height: desktopHeight,
    quality: 78,
  })
  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    src: mobileSrc,
    width: mobileWidth,
    height: mobileHeight,
    quality: 78,
  })

  return (
    <picture className="absolute inset-0 block">
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      <img
        {...mobileProps}
        alt={alt}
        fetchPriority="high"
        loading="eager"
        className={className}
      />
    </picture>
  )
}
