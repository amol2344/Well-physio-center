import { Helmet } from "react-helmet";
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import ExercisesSection from '../components/Home/ExerciseSection';
import StatsSection from '../components/Home/StatSection';
import TestimonialSection from '../components/Home/TestimonialSection';
import PricingSection from '../components/Home/PricingSection';
import TeamSection from '../components/Home/TeamSection';
import FAQSection from '../components/Home/FAQSection';
import CTASection from '../components/Home/CTASection';
import { getAllDoctors, transformDoctorForTeam } from '../utils/doctorUtils';
import QuadExtensionsImage from "../assets/KneeBlog/Dynamic-Quad.webp";
import HepFlexor from "../assets/ErgonomicBlog/Hep-Flexor.webp";
import SitToStandImage from "../assets/KneeBlog/Sit-to-Stand.webp";


const mainHome = () => {
  // Data for the exercises section 
  const featuredExercises = [ 
    {
      id: 1,
      title: 'Dynamic Quad Extensions',
      description: 'This exercise is excellent for isolating and strengthening.',
      difficulty: 'Beginner',
      category: 'Knee',
      image: QuadExtensionsImage
    },
    {
      id: 2,
      title: 'Sit to Stand',
      description: 'This functional exercise strengthens your quads, hamstrings, and glutes, and it mimics a movement you do every day.',
      difficulty: 'Intermediate',
      category: 'Back',
      image: SitToStandImage
    },
    {
      id: 3,
      title: 'Hip Flexor Stretch',
      description: 'Stretches hip flexors tight from sitting for long hours.',
     
      difficulty: 'Beginner',
      category: 'Shoulder',
      image: HepFlexor
    }
  ];

  // Data for testimonials section
  const testimonials = [
    {
      id: 1,
      name: 'Venkata (Verified)',
      role: 'Visited For Tendonitis Physiotherapy',
      content: 'Dr Trupti is very professional and gives clear explanation. She suggested very Simple and effective exercises.',
      rating: 5,
      company: '7 years ago'
    },
    {
      id: 2,
      name: 'Tanmay Baitule (Verified)',
      role: 'Visited For Shoulder Injuries',
      content: 'She recognises the pain and the injury and gives proper medication and exercise. Also she’s very friendly, so you won’t be bored during the treatment.',
      rating: 5,
      company: '8 years ago'
    },
    {
      id: 3,
      name: 'Hariprasad Rao (Verified)',
      role: 'Visited For Neck Pain Physiotherapy, Vertigo management',
      content: 'I had been to Dr. Trupti for my mother\'s neck problem of stiff neck muscles. Doctor explained us the problem clearly and helped my mom recover from this problem with her physiotherapy. I would recommend Dr. Trupti for physiotherapy',
      rating: 5,
      company: '8 years ago'
    }
  ];

  // Data for pricing section
  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      price: '₹1600',
      period: 'month',
      features: [
        'Access to basic exercises',
        '1 consultation per month',
        'Progress tracking',
        'Email support'
      ],
      featured: false,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Premium',
      price: '₹4300',
      period: 'month',
      features: [
        'All exercises unlocked',
        '4 consultations per month',
        'Personalized plans',
        'Priority support',
        'Video call sessions'
      ],
      featured: true,
      color: 'teal'
    },
    {
      id: 3,
      name: 'Annual',
      price: '₹35000',
      period: 'year',
      features: [
        'All premium features',
        'Unlimited consultations',
        'Family plan (up to 3 users)',
        '24/7 support',
        'Free health assessments'
      ],
      featured: false,
      color: 'indigo'
    }
  ];

  // Get all doctors and transform for team section
  const allDoctors = getAllDoctors();
  const teamMembers = allDoctors.map(transformDoctorForTeam);

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Wellness Physio Center | Expert Physiotherapy in Mumbai</title>
        <meta name="description" content="Personalized physiotherapy, evidence-based care, and tailored exercise programs at Wellness Physio Center in Mumbai. Book your appointment today." />
        <meta name="keywords" content="physiotherapy Mumbai, Wellness Physio Center, rehab, exercise therapy, pain management" />
        <link rel="canonical" href="https://Wellness Physio Centerstudio.com/" />
        <meta property="og:title" content="Wellness Physio Center | Expert Physiotherapy in Mumbai" />
        <meta property="og:description" content="Personalized physiotherapy, evidence-based care, and tailored exercise programs." />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <HeroSection />
      <FeaturesSection />
      <ExercisesSection featuredExercises={featuredExercises} />
      <StatsSection />
      <TestimonialSection testimonials={testimonials} />
      <PricingSection pricingPlans={pricingPlans} />
      <TeamSection teamMembers={teamMembers} />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default mainHome;
