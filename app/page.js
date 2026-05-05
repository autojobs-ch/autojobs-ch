import Link from 'next/link'

export default function Home() {
  return (
    <main style={{fontFamily:'sans-serif', maxWidth:'900px', margin:'0 auto', padding:'2rem'}}>
      
      {/* Navigation */}
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'3rem', borderBottom:'1px solid #eee', paddingBottom:'1rem'}}>
        <div style={{fontWeight:'700', fontSize:'22px'}}>
          autojobs<span style={{color:'#D85A30'}}>.ch</span>
        </div>
        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          <Link href="/jobs" style={{color:'#666', textDecoration:'none', fontSize:'14px'}}>Jobs</Link>
          <Link href="/firmen" style={{color:'#666', textDecoration:'none', fontSize:'14px'}}>Firmen</Link>
          <Link href="/preise" style={{color:'#666', textDecoration:'none', fontSize:'14px'}}>Preise</Link>
          <Link href="/inserat" style={{background:'#D85A30', color:'#fff', padding:'7px 16px', borderRadius:'8px', textDecoration:'none', fontSize:'13px', fontWeight:'500'}}>Inserieren</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{textAlign:'center', padding:'3rem 0 2rem'}}>
        <div style={{background:'#FAECE7', color:'#993C1D', fontSize:'12px', fontWeight:'500', padding:'4px 14px', borderRadius:'20px', display:'inline-block', marginBottom:'1rem'}}>
          Schweizer Jobportal für die Automobilbranche
        </div>
        <h1 style={{fontSize:'36px', fontWeight:'700', margin:'0 0 0.5rem'}}>
          Finde deinen Job<br/>in der <span style={{color:'#D85A30'}}>Autobranche</span>
        </h1>
        <p style={{color:'#666', fontSize:'15px', marginBottom:'2rem'}}>
          Mechaniker, Verkauf, Karosserie, Lackierung & mehr – in deiner Region
        </p>

        {/* Suchleiste */}
        <div style={{display:'flex', gap:'8px', maxWidth:'640px', margin:'0 auto', background:'#fff', border:'1px solid #ddd', borderRadius:'12px', padding:'6px'}}>
          <input type="text" placeholder="Jobtitel, Berufsfeld..." style={{flex:2, border:'none', outline:'none', fontSize:'14px', padding:'6px 10px', background:'transparent'}}/>
          <div style={{width:'1px', background:'#eee'}}></div>
          <select style={{flex:1, border:'none', outline:'none', fontSize:'14px', padding:'6px 10px', background:'transparent', color:'#666'}}>
            <option>Alle Kantone</option>
            <option>Zürich</option>
            <option>Bern</option>
            <option>Basel</option>
            <option>Luzern</option>
          </select>
          <div style={{width:'1px', background:'#eee'}}></div>
          <select style={{flex:1, border:'none', outline:'none', fontSize:'14px', padding:'6px 10px', background:'transparent', color:'#666'}}>
            <option>Alle Kategorien</option>
            <option>Mechanik</option>
            <option>Fahrzeugverkauf</option>
            <option>Karosserie & Lack</option>
            <option>E-Mobility</option>
          </select>
          <button style={{background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'8px 20px', fontSize:'14px', fontWeight:'500', cursor:'pointer'}}>
            Suchen
          </button>
        </div>
      </div>

      {/* Kategorien */}
      <div style={{marginTop:'3rem'}}>
        <h2 style={{fontSize:'18px', fontWeight:'700', marginBottom:'1rem'}}>Berufsfelder</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'10px'}}>
          {[
            {icon:'🔧', name:'Mechanik', count:'142 Jobs'},
            {icon:'🚗', name:'Fahrzeugverkauf', count:'87 Jobs'},
            {icon:'🎨', name:'Karosserie & Lack', count:'63 Jobs'},
            {icon:'⚡', name:'Elektrik / E-Mobility', count:'51 Jobs'},
            {icon:'📋', name:'Serviceberatung', count:'44 Jobs'},
            {icon:'🏢', name:'Administration', count:'29 Jobs'},
          ].map((cat) => (
            <div key={cat.name} style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1rem', textAlign:'center', cursor:'pointer'}}>
              <div style={{fontSize:'24px', marginBottom:'6px'}}>{cat.icon}</div>
              <div style={{fontSize:'13px', fontWeight:'500'}}>{cat.name}</div>
              <div style={{fontSize:'11px', color:'#999', marginTop:'2px'}}>{cat.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{borderTop:'1px solid #eee', marginTop:'4rem', paddingTop:'1.5rem', textAlign:'center', fontSize:'12px', color:'#999'}}>
        autojobs.ch — Das Schweizer Jobportal für die Automobilbranche
      </footer>

    </main>
  )
}