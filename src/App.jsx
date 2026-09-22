import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'


import spaceMusic from '/space-music.mp3' 

function MainPlanet() {
  const meshRef = useRef()
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#ff00ea" wireframe={true} />
    </mesh>
  )
}


function SkillPlanet({ radius, speed, color, offset }) {
  const orbitRef = useRef()
  useFrame((state, delta) => {
    orbitRef.current.rotation.y += delta * speed
  })

  return (
    <group ref={orbitRef} rotation={[offset, 0, 0]}>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function ProjectCard({ title, desc, link, imgUrl }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      style={projectCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={{ fontSize: '1.2rem', color: '#ff00ea', marginBottom: '5px' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#bbb', marginBottom: '10px' }}>{desc}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#00ffff', textDecoration: 'none', fontSize: '0.9rem' }}>
          View Project →
        </a>
      )}

      {isHovered && imgUrl && (
        <div style={previewImageStyle}>
          <div style={{ color: '#00ffff', fontSize: '0.75rem', marginBottom: '5px', letterSpacing: '1px' }}>PREVIEW</div>
          <img 
            src={imgUrl} 
            alt={title} 
            style={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.insertAdjacentHTML('afterend', '<p style="color:#aaa; font-size:0.8rem;">Image not found in public folder!</p>')
            }} 
          />
        </div>
      )}
    </div>
  )
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMusicModal, setShowMusicModal] = useState(true) 
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(spaceMusic)
    audio.loop = true
    audio.volume = 0.8 
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const handleMusicPermission = (allow) => {
    setShowMusicModal(false)
    if (allow && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Play blocked by browser, user needs to click play manually.", err))
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("Play failed:", err)
        })
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0b0b14', position: 'relative', overflow: 'hidden' }}>
      
      {showMusicModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <h2 style={{ color: '#00ffff', marginBottom: '10px' }}>Welcome to My Universe 🪐</h2>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>
              Would you like to listen to the ambient background music while exploring?
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={() => handleMusicPermission(true)} style={modalButtonStyle('#ff00ea')}>Yes, Turn It On! 🎵</button>
              <button onClick={() => handleMusicPermission(false)} style={modalButtonStyle('#ffffff')}>No, Keep It Quiet</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={toggleMusic} style={audioButtonStyle}>
        {isPlaying ? '🔊 MUSIC ON' : '🔈 MUSIC OFF'}
      </button>

      <div style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        zIndex: 10,
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        maxWidth: '400px',
        color: 'white'
      }}>
        <p style={{ color: '#ff00ea', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
          NAMASTE & HELLO!
        </p>

        <h1 style={{ fontSize: '3.5rem', marginBottom: '5px', fontWeight: '800', lineHeight: '1.2' }}>
          I'm Jyoti Bist
        </h1>

        <h2 style={{ fontSize: '1.5rem', color: '#00ffff', marginBottom: '15px', fontWeight: '500' }}>
          Creative Frontend Developer
        </h2>
        
        <p style={{ fontSize: '1rem', color: '#aaaaaa', lineHeight: '1.6', marginBottom: '20px' }}>
          Hailing from the beautiful lands of **Nepal** and recently graduated from **Roorkee Institute of Technology**, Uttarakhand. I build immersive and interactive digital experiences.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href="https://in.linkedin.com/in/jyoti-bist-972604254" target="_blank" rel="noopener noreferrer" style={buttonStyle('#ff00ea')}>LinkedIn</a>
          <a href="https://github.com/bistjyoti" target="_blank" rel="noopener noreferrer" style={buttonStyle('#00ffff')}>GitHub</a>
          <a href="mailto:bistjyoti64@gmail.com" style={buttonStyle('#ffffff')}>Email</a>
          <a href="https://leetcode.com/u/Jyoti_Bist/" target="_blank" rel="noopener noreferrer" style={buttonStyle('#FFA116')}>LeetCode</a>
          <a href="https://www.hackerrank.com/profile/bistjyoti64" target="_blank" rel="noopener noreferrer" style={buttonStyle('#2EC866')}>HackerRank</a>
        </div>
      </div>

  
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        zIndex: 10,
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        maxWidth: '360px',
        maxHeight: '75vh',
        overflowY: 'auto',
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        paddingRight: '10px' 
      }}>
        
        {/* SECTION 1: TECHNICAL SKILLS */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={sectionHeaderStyle}>Technical Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['HTML5', 'CSS3', 'JavaScript', 'C (Intermediate)', 'C++', 'Python', 'Git', 'GitHub'].map((skill, index) => (
              <span key={index} style={skillBadgeStyle}>{skill}</span>
            ))}
          </div>
        </div>

        {/* SECTION 2: EXPERIENCE / INTERNSHIP */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={sectionHeaderStyle}>Experience</h2>
          <div style={projectCardStyle}>
            <h3 style={{ fontSize: '1.1rem', color: '#ff00ea', marginBottom: '5px' }}>Frontend Web Developer Intern</h3>
            <p style={{ fontSize: '0.8rem', color: '#00ffff', marginBottom: '5px' }}>Codetech IT Solutions | 2025</p>
            <p style={{ fontSize: '0.85rem', color: '#bbb' }}>
              • Developing responsive websites using HTML, CSS & JS.<br/>
              • Collaborating remotely with Git.
            </p>
          </div>
        </div>

        {/* SECTION 3: MY PROJECTS */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={sectionHeaderStyle}>My Projects</h2>
          
          <ProjectCard 
            title="3D Developer Portfolio"
            desc="An interactive 3D portfolio made with React, Three.js, and Fiber to showcase my creative work."
            link="https://my-3d-portfolio-taupe.vercel.app"
            imgUrl={`${import.meta.env.BASE_URL}3d developer portfolio.png`} 
          />
          
          <ProjectCard 
            title="Jio-Hotstar Clone"
            desc="A replica of the Jio-Hotstar OTT platform. Focused on rich UI components."
            link="https://github.com/bistjyoti/jio-hotstar-clone"
            imgUrl={`${import.meta.env.BASE_URL}jio.png`} 
          />
          
          <ProjectCard 
            title="DineAtDoor"
            desc="A dynamic web application for ordering food online. Built with a smooth cart experience."
            link="https://github.com/bistjyoti/DineAtDoor"
            imgUrl={`${import.meta.env.BASE_URL}home.png`} 
          />
        </div>

          <div>
            <h2 style={sectionHeaderStyle}>Research & Certifications</h2>
            
            <ProjectCard 
              title="Augmented Reality - An Overview"
              desc="Academic Research Paper published/submitted in 2022. Explores AR technologies and their impact."
              link="" 
              imgUrl={`${import.meta.env.BASE_URL}research-paper.jpeg`} 
            />

            <div style={projectCardStyle}>
              <span style={{ color: '#00ffff', fontSize: '0.9rem', fontWeight: 'bold' }}>📄 Certifications: IIT Bombay (C, Python, Java)</span>
            </div>
          </div>

         

      </div>

      {/* 🪐 3D SCENE */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <OrbitControls enableZoom={true} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <MainPlanet />

        <SkillPlanet radius={2.2} speed={0.5} color="#00ffff" offset={0} />
        <SkillPlanet radius={2.5} speed={0.3} color="#ffff00" offset={0.5} />
        <SkillPlanet radius={2.8} speed={0.4} color="#00ff00" offset={-0.5} />
      </Canvas>
    </div>
  )
}

// Styling Objects
const buttonStyle = (color) => ({
  padding: '10px 20px',
  border: `1px solid ${color}`,
  color: color,
  textDecoration: 'none',
  borderRadius: '4px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  backgroundColor: 'rgba(0,0,0,0.4)',
  transition: 'all 0.3s ease'
})

const sectionHeaderStyle = {
  fontSize: '1.4rem', 
  color: '#00ffff', 
  marginBottom: '12px', 
  borderBottom: '1px solid rgba(0, 255, 255, 0.2)', 
  paddingBottom: '5px'
}

const skillBadgeStyle = {
  backgroundColor: 'rgba(255, 0, 234, 0.1)', 
  color: '#ff00ea',
  padding: '5px 10px', 
  borderRadius: '4px', 
  fontSize: '0.8rem',
  fontWeight: 'bold', 
  border: '1px solid rgba(255, 0, 234, 0.3)'
}

const projectCardStyle = {
  marginBottom: '15px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  position: 'relative',
  cursor: 'pointer'
}

const previewImageStyle = {
  position: 'absolute',
  top: '-160px',
  left: '-50px',
  width: '260px',
  backgroundColor: '#0b0b14',
  padding: '10px',
  borderRadius: '8px',
  border: '2px solid #ff00ea',
  boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
  zIndex: 100
}

const audioButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 100,
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid #00ffff',
  color: '#00ffff',
  padding: '10px 15px',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
  transition: 'all 0.3s ease'
}

const modalOverlayStyle = {
  position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center',
  alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)'
}

const modalBoxStyle = {
  backgroundColor: '#0b0b14', padding: '30px', borderRadius: '15px',
  border: '1px solid #00ffff', textAlign: 'center', maxWidth: '400px',
  fontFamily: "'Segoe UI', Roboto, sans-serif"
}

const modalButtonStyle = (color) => ({
  padding: '10px 20px', border: `1px solid ${color}`, color: color,
  borderRadius: '4px', cursor: 'pointer', backgroundColor: 'transparent',
  fontWeight: 'bold', transition: 'all 0.3s ease'
})

export default App;