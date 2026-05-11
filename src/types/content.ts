export interface SiteProfile {
  name: string
  headline: string
  intro: string
  location: string
  email: string
  homeImagePath: string
  aboutImagePath: string
}

export interface SiteContentResponse {
  profile: SiteProfile
}

export interface AboutParagraph {
  key: string
  html: string
}

export interface EducationTimelineItem {
  key: string
  time: string
  school: string
  major: string
  logoPath: string
  logoShape: string
}

export interface AboutContentResponse {
  paragraphs: AboutParagraph[]
  aboutImagePath: string
  educationTimeline: EducationTimelineItem[]
}

export interface AwardItem {
  key: string
  year: string
  title: string
  result: string
}

export interface AwardsContentResponse {
  awards: AwardItem[]
}

export interface GalleryApiItem {
  key: string
  type: string
  alt: string
  srcPath: string
}

export interface GalleryContentResponse {
  items: GalleryApiItem[]
}

export interface GalleryViewItem {
  id: string
  type: string
  alt: string
  src: string
}
