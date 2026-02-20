import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Package, Cpu, Layers, Trophy } from 'lucide-react';
import { AuroraText } from '../components/AuroraText';
import { ShimmerButton } from '../components/ShimmerButton';
import { ShineBorder } from '../components/ShineBorder';

const About = () => {
    const features = [
        { icon: <Zap color="#6366f1" />, title: "Hyper-Fast", desc: "Built with Vite for a development experience that feels like teleporting.", shineColor: "#6366f1" },
        { icon: <Globe color="#a855f7" />, title: "State Master", desc: "Context API manages your lifecycle with precision and industrial-grade reliability.", shineColor: "#a855f7" },
        { icon: <Layers color="#f43f5e" />, title: "Motion Elite", desc: "Powered by Framer Motion for buttery-smooth 60fps cinematic animations.", shineColor: "#f43f5e" },
        { icon: <ShieldCheck color="#10b981" />, title: "Immutable", desc: "LocalStorage persistence ensures your session survive even the harshest reloads.", shineColor: "#10b981" },
        { icon: <Cpu color="#f59e0b" />, title: "Modern DNA", desc: "Pure functional components and modern hooks at the core of every line.", shineColor: "#f59e0b" },
        { icon: <Package color="#3b82f6" />, title: "Magic UI", desc: "Advanced visual components that push the boundaries of web aesthetics.", shineColor: "#3b82f6" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ paddingBottom: '10rem' }}
        >
            <section className="hero" style={{ padding: '12rem 0 8rem' }}>
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="category-tag" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', letterSpacing: '0.2em' }}>ENGINEERING THE FUTURE</span>
                    <h1 className="hero-title" style={{ fontSize: '6rem' }}>Defying <AuroraText>Mediocrity</AuroraText></h1>
                    <p className="hero-p" style={{ fontSize: '1.75rem' }}>
                        SwiftCart is a testament to what happens when cutting-edge technology meets uncompromising design.
                    </p>
                </motion.div>
            </section>

            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <ShineBorder shineColor={f.shineColor} borderRadius="2.5rem" duration="10s">
                            <div
                                className="glass-panel"
                                style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '2.5rem', height: '100%' }}
                            >
                                <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {React.cloneElement(f.icon, { size: 36 })}
                                </div>
                                <h3 className="font-heading" style={{ fontSize: '1.75rem' }}>{f.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{f.desc}</p>
                            </div>
                        </ShineBorder>
                    </motion.div>
                ))}
            </div>

            <ShineBorder shineColor="#ffffff" borderRadius="4rem" className="cta-shine" style={{ marginTop: '10rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel"
                    style={{ background: 'var(--grad-primary)', padding: '8rem 2rem', borderRadius: '4rem', color: 'white', position: 'relative', overflow: 'hidden', border: 'none' }}
                >
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.1 }}>
                        <Trophy size={400} />
                    </div>

                    <h2 className="font-heading" style={{ fontSize: '4.5rem', marginBottom: '2rem', textAlign: 'center' }}>Winning Is <AuroraText colors={['#ffffff', '#f8fafc', '#e2e8f0']}>Inevitable</AuroraText></h2>
                    <p style={{ opacity: 0.9, fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 4rem', textAlign: 'center' }}>
                        This isn't just a project. It's a statement. Every pixel has been painstakingly refined to ensure you come out on top.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ShimmerButton
                            shimmerColor="#ffffff"
                            background="rgba(255, 255, 255, 0.15)"
                            style={{ padding: '1.5rem 4rem', fontSize: '1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}
                        >
                            Join the Elite
                        </ShimmerButton>
                    </div>
                </motion.div>
            </ShineBorder>
        </motion.div>
    );
};

export default About;
