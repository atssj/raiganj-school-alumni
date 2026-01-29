import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { ViewState } from '../types';
import { ArrowRight, Users, Calendar, Heart, MapPin, X, Facebook, Linkedin, Bird, Clock, GraduationCap, Quote, Menu, Play, Youtube, ChevronDown, HandHeart } from 'lucide-react';
import { Reveal } from './common/Reveal';
import { LoginModal } from './auth/LoginModal';
import { MOCK_GALLERY } from '../data/mocks';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onLogin }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navTextColor = isScrolled ? 'text-gray-900' : 'text-white';
  const navHoverColor = isScrolled ? 'hover:text-brand-600' : 'hover:text-brand-200';
  const logoBg = isScrolled ? 'bg-brand-600' : 'bg-white';
  const logoText = isScrolled ? 'text-white' : 'text-brand-900';
  const logoSubtext = isScrolled ? 'text-gray-500' : 'text-gray-300';
  const menuIconColor = isScrolled ? 'text-gray-900' : 'text-white';

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100/50 py-2 shadow-sm' 
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-serif font-bold text-xl md:text-2xl shadow-lg transition-all duration-300 ${logoBg} ${logoText}`}>R</div>
                <div className="flex flex-col">
                    <span className={`font-serif text-lg md:text-xl font-bold tracking-tight leading-none transition-colors ${navTextColor}`}>রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি</span>
                    <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${logoSubtext}`}>Alumni Network</span>
                </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              <button 
                  onClick={() => onNavigate(ViewState.ABOUT)}
                  className={`text-sm font-medium transition-colors relative group ${navTextColor} ${navHoverColor}`}
              >
                  About
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-brand-600' : 'bg-white'}`}></span>
              </button>

              <button 
                  onClick={() => scrollToSection('gallery-section')}
                  className={`text-sm font-medium transition-colors relative group ${navTextColor} ${navHoverColor}`}
              >
                  Gallery
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-brand-600' : 'bg-white'}`}></span>
              </button>

              <button 
                  onClick={() => onNavigate(ViewState.STORIES)}
                  className={`text-sm font-medium transition-colors relative group ${navTextColor} ${navHoverColor}`}
              >
                  Stories
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-brand-600' : 'bg-white'}`}></span>
              </button>

              <button 
                  onClick={() => onNavigate(ViewState.EVENTS)}
                  className={`text-sm font-medium transition-colors relative group ${navTextColor} ${navHoverColor}`}
              >
                  Events
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-brand-600' : 'bg-white'}`}></span>
              </button>

              {/* Engage Dropdown */}
              <div className="relative group">
                <button 
                    className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${navTextColor} ${navHoverColor}`}
                >
                    Engage
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-1.5 ring-1 ring-black/5">
                        <button 
                            onClick={() => onNavigate(ViewState.DONATE)}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors flex items-center gap-3"
                        >
                            <Heart className="w-4 h-4 text-brand-500" /> Donate
                        </button>
                        <button 
                            onClick={() => onNavigate(ViewState.VOLUNTEER)}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors flex items-center gap-3"
                        >
                            <HandHeart className="w-4 h-4 text-brand-500" /> Volunteer
                        </button>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                onClick={() => setIsLoginModalOpen(true)} 
                variant={isScrolled ? 'primary' : 'white'}
                className={`rounded-full px-6 transition-all duration-300 border-none ${isScrolled ? 'bg-brand-950 hover:bg-black' : ''}`}
              >
                Join Network
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button 
                className={`md:hidden p-2 transition-colors ${menuIconColor}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
            className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        >
            <div className="flex flex-col p-6 space-y-4 h-screen bg-white pb-32 overflow-y-auto">
                <button onClick={() => { onNavigate(ViewState.ABOUT); setIsMobileMenuOpen(false); }} className="text-left py-3 font-serif text-2xl font-medium text-gray-900 border-b border-gray-50">About</button>
                <button onClick={() => { scrollToSection('gallery-section'); setIsMobileMenuOpen(false); }} className="text-left py-3 font-serif text-2xl font-medium text-gray-900 border-b border-gray-50">Gallery</button>
                <button onClick={() => { onNavigate(ViewState.STORIES); setIsMobileMenuOpen(false); }} className="text-left py-3 font-serif text-2xl font-medium text-gray-900 border-b border-gray-50">Stories</button>
                <button onClick={() => { onNavigate(ViewState.EVENTS); setIsMobileMenuOpen(false); }} className="text-left py-3 font-serif text-2xl font-medium text-gray-900 border-b border-gray-50">Events</button>
                
                <div className="py-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Engage</span>
                    <button onClick={() => { onNavigate(ViewState.DONATE); setIsMobileMenuOpen(false); }} className="text-left w-full py-2 font-serif text-xl font-medium text-gray-900 flex items-center gap-3">
                        <Heart className="w-5 h-5 text-brand-500" /> Donate
                    </button>
                    <button onClick={() => { onNavigate(ViewState.VOLUNTEER); setIsMobileMenuOpen(false); }} className="text-left w-full py-2 font-serif text-xl font-medium text-gray-900 flex items-center gap-3">
                        <HandHeart className="w-5 h-5 text-brand-500" /> Volunteer
                    </button>
                </div>

                <div className="pt-8 flex flex-col gap-4">
                    <Button size="lg" onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full justify-center">Join Network</Button>
                </div>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20 pb-28 md:pb-32">
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2800&auto=format&fit=crop" 
                className="w-full h-full object-cover scale-105 animate-pulse-slow" 
                style={{ animationDuration: '20s' }}
                alt="Forest Path" 
             />
             <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-black/40 to-brand-950/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto mt-0 md:mt-16">
            <Reveal>
                <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-100 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-lg">
                    <MapPin className="w-3 h-3" /> Raiganj, West Bengal
                </div>
            </Reveal>

            <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                    Rooted in <span className="text-brand-300 italic font-light">History</span>.<br/>
                    Connected by <span className="text-brand-300 italic font-light">Heart</span>.
                </h1>
            </Reveal>

            <Reveal delay={200}>
                <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light drop-shadow-md">
                    From the misty banks of Kulik to every corner of the globe. 
                    Join 15,000+ alumni reliving the golden days of Raiganj.
                </p>
            </Reveal>

            <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5 w-full max-w-sm sm:max-w-none mx-auto">
                    <Button size="lg" variant="white" onClick={() => onNavigate(ViewState.DIRECTORY)} className="rounded-full w-full sm:w-auto px-8 md:px-10 h-12 md:h-14 text-base md:text-lg border-none shadow-xl">
                        Find Your Batch
                        <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => onNavigate(ViewState.STORIES)} className="rounded-full w-full sm:w-auto px-8 md:px-10 h-12 md:h-14 text-base md:text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                        <Play className="w-4 h-4 mr-2 fill-current" /> Watch Stories
                    </Button>
                </div>
            </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-white/5 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 text-white/80">
                     <div className="flex flex-wrap gap-4 md:gap-12 text-[10px] md:text-sm font-medium tracking-widest uppercase">
                         <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Raiganj Coronation</span>
                         <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div> Raiganj Girls'</span>
                         <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div> Sudarshanpur</span>
                     </div>
                     <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                         <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <img key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 object-cover" src={`https://picsum.photos/100/100?random=${i + 20}`} alt="Alumni" />
                            ))}
                         </div>
                         <span><strong className="text-white">1,240</strong> alumni joined this month</span>
                     </div>
                 </div>
            </div>
        </div>
      </section>

      {/* Spirit of Raiganj Section */}
      <section id="about-section" className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-20">
                <Reveal>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6">The Spirit of Raiganj</h2>
                    <div className="w-24 h-1 bg-brand-600 mx-auto rounded-full mb-4 md:mb-6"></div>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        It's not just a town; it's an emotion. The sound of the morning assembly bell, the cycle rides through College Para, and the aroma of tea at Bandar.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <Reveal delay={100} className="md:col-span-2 relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] h-[300px] md:h-[400px]">
                    <img src="https://images.unsplash.com/photo-1470114716159-e389f87b9610?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Kulik Bird Sanctuary" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-10 flex flex-col justify-end">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/20 backdrop-blur rounded-lg text-white"><Bird className="w-5 h-5 md:w-6 md:h-6"/></div>
                            <span className="text-brand-200 font-bold tracking-widest text-[10px] md:text-xs uppercase">Asia's 2nd Largest</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Kulik Bird Sanctuary</h3>
                        <p className="text-gray-300 max-w-md text-sm md:text-base">Every winter, migratory birds find their way home to Raiganj. Just like our alumni returning for the grand reunion.</p>
                    </div>
                </Reveal>

                <Reveal delay={200} className="relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] h-[350px] md:h-[400px] bg-brand-50 p-6 md:p-8 flex flex-col justify-between border border-brand-100 hover:border-brand-300 transition-colors">
                    <div>
                        <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 mb-6">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Decades of Excellence</h3>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            From the historic Coronation High School to the vibrant halls of Raiganj Girls'. Our schools have shaped leaders, artists, and thinkers.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-brand-700 font-medium cursor-pointer group-hover:gap-3 transition-all">
                        <span onClick={() => onNavigate(ViewState.ABOUT)}>View History</span> <ArrowRight className="w-4 h-4" />
                    </div>
                </Reveal>

                <Reveal delay={300} className="relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] h-[350px] md:h-[400px] bg-brand-900 p-6 md:p-8 flex flex-col justify-between">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px]"></div>
                     <div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-3">The Clock Tower Adda</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            Time stands still when old friends meet. Relive the endless political debates, cricket commentary, and tea breaks that defined our youth.
                        </p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop" className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover rounded-tl-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity" alt="Tea" />
                </Reveal>

                <Reveal delay={400} className="md:col-span-2 relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] h-[300px] md:h-[400px]">
                    <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Community" />
                     <div className="absolute inset-0 bg-brand-950/40 p-6 md:p-10 flex flex-col justify-center items-center text-center hover:bg-brand-950/50 transition-colors">
                        <Quote className="w-10 h-10 md:w-12 md:h-12 text-white mb-4 md:mb-6 opacity-80" />
                        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                            "Raiganj is not just a place on the map.<br/>It's the geography of my soul."
                        </h3>
                        <p className="text-white font-medium">— Amitav Ghosh, Batch of '92</p>
                    </div>
                </Reveal>
            </div>
        </div>
      </section>

      {/* Masonry Memory Gallery */}
      <section id="gallery-section" className="py-20 md:py-32 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Reveal>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">A Walk Down Memory Lane</h2>
                        <p className="text-gray-500">Snapshots from the golden days.</p>
                    </div>
                    <Button variant="outline" className="w-full md:w-auto flex justify-center" onClick={() => onNavigate(ViewState.GALLERY)}>View Full Gallery</Button>
                </div>
            </Reveal>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                 {MOCK_GALLERY.map((photo, index) => (
                    <Reveal key={photo.id} delay={index * 100} className="break-inside-avoid">
                        <div className={`group relative bg-white p-2 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:z-10 hover:scale-[1.02] ${
                            index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                        } hover:rotate-0`}>
                            <div className="relative overflow-hidden rounded-xl">
                                <img src={photo.url} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" alt={photo.caption} />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-serif italic text-sm px-4 text-center">{photo.caption}</span>
                                </div>
                            </div>
                            <div className="p-3 text-center">
                                <p className="font-serif italic text-gray-700 text-sm md:text-base">{photo.caption}</p>
                                <p className="text-xs text-brand-600 font-bold tracking-widest uppercase mt-1 opacity-60">{photo.category} • {photo.year}</p>
                            </div>
                        </div>
                    </Reveal>
                 ))}
            </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Why Join the Network?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <Reveal delay={0}>
                    <div className="group cursor-pointer p-6 md:p-8 rounded-[2rem] hover:bg-gray-50 transition-colors duration-500" onClick={() => onNavigate(ViewState.DIRECTORY)}>
                        <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-brand-700 transition-colors">Global Directory</h3>
                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                            Search for batchmates by year, city, or profession. Our network spans across continents, yet is rooted in Raiganj.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <div className="group cursor-pointer p-6 md:p-8 rounded-[2rem] hover:bg-gray-50 transition-colors duration-500" onClick={() => onNavigate(ViewState.EVENTS)}>
                        <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                            <Calendar className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-brand-700 transition-colors">Events & Reunions</h3>
                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                            From the nostalgic Saraswati Puja to the Grand Winter Reunion. RSVP to events and make new memories.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div className="group cursor-pointer p-6 md:p-8 rounded-[2rem] hover:bg-gray-50 transition-colors duration-500" onClick={() => onNavigate(ViewState.DONATE)}>
                        <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                            <Heart className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-brand-700 transition-colors">Giving Back</h3>
                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                            Support the institution that supported you. Create scholarships, fund infrastructure, or mentor a student.
                        </p>
                    </div>
                </Reveal>
            </div>
        </div>
      </section>

      <footer className="bg-brand-950 text-white py-12 md:py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-brand-900 pb-16">
                <div className="md:col-span-5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-brand-900 font-serif font-bold text-xl">R</div>
                        <span className="font-serif text-2xl font-bold text-white tracking-tight">রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি</span>
                    </div>
                    <p className="text-brand-200/80 max-w-sm leading-relaxed mb-8 text-sm">
                        Connecting generations of learners from the heart of North Dinajpur. <br/> Established 1952.
                    </p>
                    <div className="flex gap-4">
                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center hover:bg-[#1877F2] transition-colors cursor-pointer text-white group">
                            <Facebook className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center hover:bg-[#0A66C2] transition-colors cursor-pointer text-white group">
                            <Linkedin className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center hover:bg-[#FF0000] transition-colors cursor-pointer text-white group">
                            <Youtube className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>
                
                <div className="md:col-span-2 md:col-start-7">
                    <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-brand-400">Quick Links</h4>
                    <ul className="space-y-4 text-brand-200/80 text-sm">
                        <li><button onClick={() => setIsLoginModalOpen(true)} className="hover:text-white transition-colors">Member Login</button></li>
                        <li><button onClick={() => onNavigate(ViewState.EVENTS)} className="hover:text-white transition-colors">Events</button></li>
                        <li><button onClick={() => onNavigate(ViewState.DONATE)} className="hover:text-white transition-colors">Donate</button></li>
                        <li><button onClick={() => onNavigate(ViewState.VOLUNTEER)} className="hover:text-white transition-colors">Volunteer</button></li>
                    </ul>
                </div>

                <div className="md:col-span-3">
                    <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-brand-400">Contact</h4>
                    <ul className="space-y-4 text-brand-200/80 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-brand-400 mt-0.5"/> 
                            <span>College Para, Raiganj,<br/>North Dinajpur, West Bengal</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-5 h-5 flex items-center justify-center text-brand-400">@</div>
                            contact@raiganjalumni.org
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-300/60 text-sm text-center md:text-left">
                <p>© {new Date().getFullYear()} রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি Alumni Association.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={onLogin} />
    </div>
  );
};