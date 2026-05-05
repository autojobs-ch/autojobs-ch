'use client'
import { useState } from 'react'
import { supabase } from '../supabase'
import Link from 'next/link'

export default function Inserat() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    canton: '',
    category: '',
    pensum: 'Vollzeit',
    employment_type: 'Festanstellung',
    description: '',
    requirements: '',
    benefits: '',
    email: '',
    package: 'basis'
  })

  function update(field, value) {
    setForm({...form, [field]: value})
  }

  async function submit() {
    setLoading(true)
    const { error } = await supabase.from('jobs').insert({
      ...form,
      status: 'active'
    })
    setLoading(false)
    if (!error) setSuccess(true)
  }

  const inputStyle = {
    width:'100%',
    padding:'9px 11px',
    border:'1px solid #ddd',
    borderRadius:'8px',
    fontSize:'13px',
    boxSizing:'border-box',
    outline:'none',
    fontFamily:'sans-serif'
  }
  const labelStyle = {
    fontSize:'12px',
    fontWeight:'500',
    color:'#666',
    display:'block',
    marginBottom:'5px'
  }

  if (success) return (
    <main style={{fontFamily:'sans-serif', maxWidth:'500px', margin:'4rem auto', padding:'2rem', textAlign:'center'}}>
      <div style={{background:'#EAF3DE', border:'1px solid #B8DCA0', borderRadius:'16px', padding:'2rem'}}>
        <p style={{fontSize:'40px', margin:'0 0 1rem'}}>🎉</p>
        <h2 style={{fontSize:'20px', fontWeight:'700', margin:'0 0 0.5rem', color:'#3B6D11'}}>Inserat wurde publiziert!</h2>
        <p style={{fontSize:'14px', color:'#3B6D11', margin:'0 0 1.5rem'}}>Dein Job ist jetzt live auf autojobs.ch</p>
        <Link href="/jobs" style={{background:'#D85A30', color:'#fff', padding:'10px 24px', borderRadius:'8px', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>
          Jobs anschauen
        </Link>
      </div>
    </main>
  )

  return (
    <main style={{fontFamily:'sans-serif', maxWidth:'680px', margin:'0 auto', padding:'2rem'}}>

      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', borderBottom:'1px solid #eee', paddingBottom:'1rem'}}>
        <Link href="/" style={{fontWeight:'700', fontSize:'20px', textDecoration:'none', color:'#000'}}>
          autojobs<span style={{color:'#D85A30'}}>.ch</span>
        </Link>
        <Link href="/jobs" style={{color:'#666', textDecoration:'none', fontSize:'14px'}}>
          Zurueck zu Jobs
        </Link>
      </nav>

      <h1 style={{fontSize:'22px', fontWeight:'700', margin:'0 0 0.5rem'}}>Neues Inserat schalten</h1>
      <p style={{fontSize:'14px', color:'#666', margin:'0 0 2rem'}}>Erreiche Fachkraefte in der Schweizer Automobilbranche.</p>

      <div style={{display:'flex', gap:'8px', marginBottom:'2rem'}}>
        <div style={{flex:1, height:'4px', borderRadius:'2px', background: step >= 1 ? '#D85A30' : '#eee'}}></div>
        <div style={{flex:1, height:'4px', borderRadius:'2px', background: step >= 2 ? '#D85A30' : '#eee'}}></div>
        <div style={{flex:1, height:'4px', borderRadius:'2px', background: step >= 3 ? '#D85A30' : '#eee'}}></div>
      </div>

      {step === 1 && (
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem'}}>
          <h2 style={{fontSize:'15px', fontWeight:'700', margin:'0 0 1.25rem', paddingBottom:'0.75rem', borderBottom:'1px solid #eee'}}>
            Schritt 1 – Stellendetails
          </h2>

          <div style={{marginBottom:'1rem'}}>
            <label style={labelStyle}>Stellenbezeichnung *</label>
            <input style={inputStyle} placeholder="z.B. Automechaniker (m/w/d)" value={form.title} onChange={e => update('title', e.target.value)} />
          </div>

          <div style={{marginBottom:'1rem'}}>
            <label style={labelStyle}>Firmenname *</label>
            <input style={inputStyle} placeholder="z.B. Autohaus Mueller AG" value={form.company} onChange={e => update('company', e.target.value)} />
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'1rem'}}>
            <div>
              <label style={labelStyle}>Ort *</label>
              <input style={inputStyle} placeholder="z.B. Zuerich" value={form.location} onChange={e => update('location', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Kanton *</label>
              <select style={inputStyle} value={form.canton} onChange={e => update('canton', e.target.value)}>
                <option value="">Kanton waehlen</option>
                <option>Aargau</option>
                <option>Appenzell Ausserrhoden</option>
                <option>Appenzell Innerrhoden</option>
                <option>Basel-Landschaft</option>
                <option>Basel-Stadt</option>
                <option>Bern</option>
                <option>Freiburg</option>
                <option>Genf</option>
                <option>Glarus</option>
                <option>Graubünden</option>
                <option>Jura</option>
                <option>Luzern</option>
                <option>Nidwalden</option>
                <option>Obwalden</option>
                <option>Schaffhausen</option>
                <option>Schwyz</option>
                <option>Solothurn</option>
                <option>St. Gallen</option>
                <option>Tessin</option>
                <option>Thurgau</option>
                <option>Uri</option>
                <option>Waadt</option>
                <option>Wallis</option>
                <option>Zug</option>
                <option>Zürich</option>
              </select>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'1rem'}}>
            <div>
              <label style={labelStyle}>Berufsfeld *</label>
              <select style={inputStyle} value={form.category} onChange={e => update('category', e.target.value)}>
                <option value="">Kategorie wählen</option>
                <option>Automechaniker/-in</option>
                <option>Automobil-Mechatroniker/-in</option>
                <option>Automobildiagnostiker/-in</option>
                <option>Autolackierer/-in</option>
                <option>Carrosseriespengler/-in</option>
                <option>Serviceberater/-in</option>
                <option>Autoverkäufer/-in</option>
                <option>Reifenpraktiker/-in</option>
                <option>Elektriker / E-Mobility</option>
                <option>Chauffeur / Transport</option>
                <option>Disponent/-in</option>
                <option>Büro & Verwaltung</option>
                <option>Führungspositionen</option>
                <option>Lehrstelle / Praktikum</option>
                <option>Werkstatt & Hilfskräfte</option>
                <option>Sonstige</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Pensum *</label>
              <select style={inputStyle} value={form.pensum} onChange={e => update('pensum', e.target.value)}>
                <option>Vollzeit</option>
                <option>Teilzeit</option>
                <option>80-100%</option>
                <option>Lehrling / Praktikum</option>
              </select>
            </div>
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={labelStyle}>Anstellungsart</label>
            <select style={inputStyle} value={form.employment_type} onChange={e => update('employment_type', e.target.value)}>
              <option>Festanstellung</option>
              <option>Befristet</option>
              <option>Lehrling / Praktikum</option>
            </select>
          </div>

          <button
            onClick={() => setStep(2)}
            style={{background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 24px', fontSize:'14px', fontWeight:'500', cursor:'pointer', float:'right'}}
          >
            Weiter
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem'}}>
          <h2 style={{fontSize:'15px', fontWeight:'700', margin:'0 0 1.25rem', paddingBottom:'0.75rem', borderBottom:'1px solid #eee'}}>
            Schritt 2 – Stellenbeschreibung
          </h2>

          <div style={{marginBottom:'1rem'}}>
            <label style={labelStyle}>Aufgaben *</label>
            <textarea style={{...inputStyle, minHeight:'100px', resize:'vertical'}} placeholder="Beschreibe die Hauptaufgaben..." value={form.description} onChange={e => update('description', e.target.value)} />
          </div>

          <div style={{marginBottom:'1rem'}}>
            <label style={labelStyle}>Anforderungen *</label>
            <textarea style={{...inputStyle, minHeight:'100px', resize:'vertical'}} placeholder="Was bringt der ideale Kandidat mit?" value={form.requirements} onChange={e => update('requirements', e.target.value)} />
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={labelStyle}>Wir bieten (optional)</label>
            <textarea style={{...inputStyle, minHeight:'80px', resize:'vertical'}} placeholder="Was bietet ihr dem Kandidaten?" value={form.benefits} onChange={e => update('benefits', e.target.value)} />
          </div>

          <div style={{display:'flex', justifyContent:'space-between'}}>
            <button onClick={() => setStep(1)} style={{background:'transparent', border:'1px solid #ddd', borderRadius:'8px', padding:'10px 20px', fontSize:'14px', cursor:'pointer'}}>
              Zurueck
            </button>
            <button onClick={() => setStep(3)} style={{background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 24px', fontSize:'14px', fontWeight:'500', cursor:'pointer'}}>
              Weiter
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
            <h2 style={{fontSize:'15px', fontWeight:'700', margin:'0 0 1.25rem', paddingBottom:'0.75rem', borderBottom:'1px solid #eee'}}>
              Schritt 3 – Paket und Kontakt
            </h2>

            <div style={{marginBottom:'1.25rem'}}>
              <label style={labelStyle}>Bewerbungs-E-Mail *</label>
              <input style={inputStyle} type="email" placeholder="jobs@ihrefirma.ch" value={form.email} onChange={e => update('email', e.target.value)} />
              <p style={{fontSize:'11px', color:'#999', margin:'4px 0 0'}}>Bewerbungen kommen direkt in dieses Postfach.</p>
            </div>

            <label style={labelStyle}>Paket waehlen</label>
            <div style={{display:'flex', flexDirection:'column', gap:'10px', marginBottom:'1.5rem'}}>

              <div
                onClick={() => update('package', 'basis')}
                style={{border: form.package === 'basis' ? '2px solid #D85A30' : '1px solid #eee', borderRadius:'10px', padding:'12px 14px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center'}}
              >
                <div>
                  <p style={{fontSize:'14px', fontWeight:'500', margin:'0 0 2px'}}>Basis</p>
                  <p style={{fontSize:'12px', color:'#666', margin:'0'}}>30 Tage, Standard-Platzierung</p>
                </div>
                <span style={{fontSize:'15px', fontWeight:'700', color:'#D85A30'}}>CHF 89</span>
              </div>

              <div
                onClick={() => update('package', 'professional')}
                style={{border: form.package === 'professional' ? '2px solid #D85A30' : '1px solid #eee', borderRadius:'10px', padding:'12px 14px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center'}}
              >
                <div>
                  <p style={{fontSize:'14px', fontWeight:'500', margin:'0 0 2px'}}>Professional</p>
                  <p style={{fontSize:'12px', color:'#666', margin:'0'}}>30 Tage, Top-Platzierung + Badge</p>
                </div>
                <span style={{fontSize:'15px', fontWeight:'700', color:'#D85A30'}}>CHF 149</span>
              </div>

              <div
                onClick={() => update('package', 'premium')}
                style={{border: form.package === 'premium' ? '2px solid #D85A30' : '1px solid #eee', borderRadius:'10px', padding:'12px 14px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center'}}
              >
                <div>
                  <p style={{fontSize:'14px', fontWeight:'500', margin:'0 0 2px'}}>Premium</p>
                  <p style={{fontSize:'12px', color:'#666', margin:'0'}}>60 Tage, Top-Platzierung + Badge</p>
                </div>
                <span style={{fontSize:'15px', fontWeight:'700', color:'#D85A30'}}>CHF 249</span>
              </div>

            </div>
          </div>

          <div style={{display:'flex', justifyContent:'space-between'}}>
            <button onClick={() => setStep(2)} style={{background:'transparent', border:'1px solid #ddd', borderRadius:'8px', padding:'10px 20px', fontSize:'14px', cursor:'pointer'}}>
              Zurueck
            </button>
            <button
              onClick={submit}
              style={{background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 28px', fontSize:'14px', fontWeight:'500', cursor:'pointer'}}
            >
              {loading ? 'Wird publiziert...' : 'Jetzt publizieren'}
            </button>
          </div>
        </div>
      )}

    </main>
  )
}