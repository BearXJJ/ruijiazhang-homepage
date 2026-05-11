import type { AboutContentResponse, AwardsContentResponse, GalleryContentResponse, SiteContentResponse } from '../types/content';
import { resolveMediaAsset } from './media';

export const siteContent: SiteContentResponse = {
  profile: {
    name: 'Ruijia Zhang',
    headline: 'A soprano exploring opera, recital, and the emotional power of the human voice.',
    intro:
      'Ruijia Zhang is a soprano currently undertaking postgraduate study at the Royal Northern College of Music under the guidance of Sarah Rhodes. Her musical path began with Memory from Cats and has grown through opera performance, choral stages, classical concerts, and competitions. This site gathers her profile, honors, and scenes from performance as she continues to refine her voice and share music with wider audiences.',
    location: 'Manchester, United Kingdom',
    email: '',
    homeImagePath: resolveMediaAsset('/media/site/home/home-portrait.jpeg'),
    aboutImagePath: resolveMediaAsset('/media/site/about/about-portrait.jpeg'),
  },
};

export const aboutContent: AboutContentResponse = {
  paragraphs: [
    {
      key: 'first-encounter',
      html: `Ruijia Zhang's first encounter with music began when she heard <span class="highlight">《Memory》 from the musical Cats</span>. Deeply moved by the beauty of the voice, she began studying vocal technique with a professor from Chongqing University while continuing her high school studies. During this period, she attended the professor's masterclasses and regularly took part in choral and solo performances at school. She also won the school's Top Ten Singers Competition for consecutive years.`,
    },
    {
      key: 'college-direction',
      html: `When preparing for the National College Entrance Examination, Ruijia decided to follow her passion for music and pursue it as a future career. She chose to study <span class="highlight">Opera Performance</span> and was admitted to <span class="highlight">Sichuan University</span>, a Project 985 comprehensive university in China, with an excellent ranking of tenth in the province.`,
    },
    {
      key: 'undergraduate-growth',
      html: `During her undergraduate studies, she received <span class="highlight">university scholarships for three consecutive years</span>. Alongside her academic work, she continued her professional vocal training at the Sichuan Conservatory of Music with outstanding young soprano teachers. During this time, she began to build a wide range of stage experience, including contemporary popular performances, classical concerts and competitions.`,
    },
    {
      key: 'choral-and-leadership',
      html: `In choral performance, she participated in the China Choral Music Week, where her choir won a <span class="highlight">Gold Award</span>, and the China International Chorus Festival, where they received <span class="highlight">First Prize</span>. She was also actively involved in student societies and served as Head of the Arts Troupe in the Student Union. In addition, she won the Provincial Second Prize in the National College Student Advertising Art Competition.`,
    },
    {
      key: 'postgraduate-study',
      html: `Ruijia graduated with honors and a high GPA of <span class="highlight">3.8</span>. She is currently studying at the <span class="highlight">Royal Northern College of Music</span>, where she continues her postgraduate training under the guidance of <span class="highlight">Sarah Rhodes</span>.`,
    },
    {
      key: 'artistic-focus',
      html: `Ruijia is committed to continuing her artistic development as a soprano, with a particular focus on <span class="highlight">opera performance, vocal refinement and expressive stage communication</span>. She hopes to build a career that allows her to share the emotional power of music with wider audiences.`,
    },
  ],
  aboutImagePath: resolveMediaAsset('/media/site/about/about-portrait.jpeg'),
  educationTimeline: [
    {
      key: 'cqu-early-training',
      time: 'Early Training (2018 - 2021)',
      school: 'Chongqing University',
      major: 'Private vocal study and masterclasses with a professor from Chongqing University.',
      logoPath: resolveMediaAsset('/media/logos/Chongqing_university.png'),
      logoShape: 'round',
    },
    {
      key: 'scu-undergraduate',
      time: 'Undergraduate (2021 - 2025)',
      school: 'Sichuan University',
      major: 'Undergraduate degree in Opera Performance.',
      logoPath: resolveMediaAsset('/media/logos/Sichuan_University_logo.png'),
      logoShape: 'round',
    },
    {
      key: 'scm-vocal-training',
      time: 'Vocal Training (2021 - 2025)',
      school: 'Sichuan Conservatory of Music',
      major: 'Professional vocal training with young soprano teachers alongside undergraduate study.',
      logoPath: resolveMediaAsset('/media/logos/Sichuan_Conservatory_of_Music_logo.png'),
      logoShape: 'round',
    },
    {
      key: 'rncm-postgraduate',
      time: 'Postgraduate (2025 - Present)',
      school: 'Royal Northern College of Music',
      major: 'Postgraduate study in Opera Performance under the guidance of Sarah Rhodes.',
      logoPath: resolveMediaAsset('/media/logos/RNCM.png'),
      logoShape: 'wide',
    },
  ],
};

export const awardsContent: AwardsContentResponse = {
  awards: [
    {
      key: 'peacock-cup-2024',
      year: '2024',
      title: 'The 11th Peacock Cup National Vocal Exhibition of Higher Arts Institutions, Vocal Opera Category',
      result: 'Silver Award',
    },
    {
      key: 'scholarship-2022-2024',
      year: '2022 - 2024',
      title: 'University-level Scholarship',
      result: 'Recipient',
    },
    {
      key: 'chorus-festival-2023',
      year: '2023',
      title: 'China International Chorus Festival',
      result: 'First Prize',
    },
    {
      key: 'national-choral-competition-2023',
      year: '2023',
      title: 'National Choral Competition, Youth Category',
      result: 'Champion',
    },
    {
      key: 'choral-music-week-2023',
      year: '2023',
      title: 'China Choral Music Week',
      result: 'Gold Award',
    },
    {
      key: 'innovative-music-2023',
      year: '2023',
      title: 'Sichuan Innovative Music Competition',
      result: 'Silver Award',
    },
    {
      key: 'advertising-art-2022',
      year: '2022',
      title: 'National College Student Advertising Art Competition',
      result: 'Provincial Second Prize',
    },
    {
      key: 'peacock-cup-2022',
      year: '2022',
      title: 'The 9th Peacock Cup National Vocal Exhibition of Higher Arts Institutions',
      result: 'Excellence Award',
    },
    {
      key: 'top-ten-singers-2018',
      year: '2018',
      title: 'Top Ten Singers Competition',
      result: 'Champion',
    },
  ],
};

export const galleryContent: GalleryContentResponse = {
  items: [
    { key: 'gallery-01', type: 'image', alt: 'Gallery image 1', srcPath: resolveMediaAsset('/media/gallery/gallery-01.jpeg') },
    { key: 'gallery-02', type: 'image', alt: 'Gallery image 2', srcPath: resolveMediaAsset('/media/gallery/gallery-02.jpeg') },
    { key: 'gallery-03', type: 'image', alt: 'Gallery image 3', srcPath: resolveMediaAsset('/media/gallery/gallery-03.jpeg') },
    { key: 'gallery-04', type: 'image', alt: 'Gallery image 4', srcPath: resolveMediaAsset('/media/gallery/gallery-04.jpeg') },
    { key: 'gallery-05', type: 'image', alt: 'Gallery image 5', srcPath: resolveMediaAsset('/media/gallery/gallery-05.jpeg') },
    { key: 'gallery-06', type: 'image', alt: 'Gallery image 6', srcPath: resolveMediaAsset('/media/gallery/gallery-06.jpeg') },
    { key: 'gallery-07', type: 'image', alt: 'Gallery image 7', srcPath: resolveMediaAsset('/media/gallery/gallery-07.jpeg') },
    { key: 'gallery-08', type: 'image', alt: 'Gallery image 8', srcPath: resolveMediaAsset('/media/gallery/gallery-08.jpeg') },
    { key: 'gallery-09', type: 'image', alt: 'Gallery image 9', srcPath: resolveMediaAsset('/media/gallery/gallery-09.jpeg') },
    { key: 'gallery-10', type: 'image', alt: 'Gallery image 10', srcPath: resolveMediaAsset('/media/gallery/gallery-10.jpeg') },
    { key: 'gallery-11', type: 'image', alt: 'Gallery image 11', srcPath: resolveMediaAsset('/media/gallery/gallery-11.jpeg') },
    { key: 'gallery-12', type: 'image', alt: 'Gallery image 12', srcPath: resolveMediaAsset('/media/gallery/gallery-12.jpeg') },
    { key: 'gallery-13', type: 'image', alt: 'Gallery image 13', srcPath: resolveMediaAsset('/media/gallery/gallery-13.jpeg') },
    { key: 'gallery-14', type: 'image', alt: 'Gallery image 14', srcPath: resolveMediaAsset('/media/gallery/gallery-14.jpeg') },
    { key: 'gallery-15', type: 'image', alt: 'Gallery image 15', srcPath: resolveMediaAsset('/media/gallery/gallery-15.jpeg') },
    { key: 'gallery-16', type: 'image', alt: 'Gallery image 16', srcPath: resolveMediaAsset('/media/gallery/gallery-16.jpeg') },
    { key: 'video-1791319427', type: 'video', alt: 'Performance video 1', srcPath: resolveMediaAsset('/media/gallery/1791319427.mp4') },
    { key: 'video-1922995544', type: 'video', alt: 'Performance video 2', srcPath: resolveMediaAsset('/media/gallery/1922995544.mp4') },
    { key: 'video-300436207', type: 'video', alt: 'Performance video 3', srcPath: resolveMediaAsset('/media/gallery/300436207.mp4') },
    { key: 'video-493280724', type: 'video', alt: 'Performance video 4', srcPath: resolveMediaAsset('/media/gallery/493280724.mp4') },
    { key: 'video-571942330', type: 'video', alt: 'Performance video 5', srcPath: resolveMediaAsset('/media/gallery/571942330.mp4') },
    { key: 'video-709622218', type: 'video', alt: 'Performance video 6', srcPath: resolveMediaAsset('/media/gallery/709622218.mp4') },
  ],
};
