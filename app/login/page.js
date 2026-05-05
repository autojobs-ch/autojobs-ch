'use client'
import { useState } from 'react'
import { supabase } from '../supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    company_name: '',
    canton: '',
    industry: ''
  })

  function update(field, value) {
    setForm({...form, [field]: value})
    setError('')
  }

  async function handleLogin() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    setLoading(false)
    if (error) {
      setError('E-Mail oder Passwort falsch.')
    } else {
      router.push('/dashboard')
    }
  }

  async function handleRegister() {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    await supabase.from('companies').insert({
      name: form.company_name,
      email: form.email,
      canton: form.canton,
      industry: form.industry,
      user_id: data.user.id,
      status: 'active'
    })
    setLoading(false)
    router.push('/dashboard')
  }

  const inputStyle = {
    width:'100%',
    padding:'9px 11px',
    border:'1px solid #ddd',
    borderRadius:'8px',
    fontSize:'13px',
    boxSizing:'border-box',
    outline:'none',
    fontFamily:'sans-serif',
    marginBottom:'10px'
  }
  const labelStyle = {
    fontSize:'12px',
    fontWeight:'500',
    color:'#666',
    display:'block',
    marginBottom:'4px'
  }

  return (
    <main style={{fontFamily:'sans-serif', maxWidth:'420px', margin:'3rem auto', padding:'1.5rem'}}>

      <div style={{textAlign:'center', marginBottom:'2rem'}}>
        <Link href="/" style={{fontWeight:'700', fontSize:'22px', textDecoration:'none', color:'#000'}}>
          autojobs<span style={{color:'#D85A30'}}>.ch</span>
        </Link>
        <p style={{fontSize:'13px', color:'#666', margin:'0.5rem 0 0'}}>Portal für Firmen</p>
      </div>

      <div style={{display:'flex', background:'#f5f5f5', borderRadius:'10px', padding:'4px', marginBottom:'1.5rem'}}>
        <button
          onClick={() => setTab('login')}
          style={{flex:1, padding:'8px', border:'none', borderRadius:'8px', fontSize:'13px', fontWeight:'500', cursor:'pointer', background: tab === 'login' ? '#fff' : 'transparent', color: tab === 'login' ? '#000' : '#666'}}
        >
          Einloggen
        </button>
        <button
          onClick={() => setTab('register')}
          style={{flex:1, padding:'8px', border:'none', borderRadius:'8px', fontSize:'13px', fontWeight:'500', cursor:'pointer', background: tab === 'register' ? '#fff' : 'transparent', color: tab === 'register' ? '#000' : '#666'}}
        >
          Registrieren
        </button>
      </div>

      <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem'}}>

        {tab === 'login' && (
          <div>
            <h2 style={{fontSize:'16px', fontWeight:'700', margin:'0 0 1.25rem'}}>Willkommen zurück</h2>
            <label style={labelStyle}>E-Mail</label>
            <input style={inputStyle} type="email" placeholder="firma@email.ch" value={form.email} onChange={e => update('email', e.target.value)} />
            <label style={labelStyle}>Passwort</label>
            <input style={inputStyle} type="password" placeholder="Dein Passwort" value={form.password} onChange={e => update('password', e.target.value)} />
            {error && <p style={{color:'#A32D2D', fontSize:'12px', margin:'0 0 10px'}}>{error}</p>}
            <button
              onClick={handleLogin}
              style={{width:'100%', background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontSize:'14px', fontWeight:'500', cursor:'pointer'}}
            >
              {loading ? 'Wird eingeloggt...' : 'Einloggen'}
            </button>
          </div>
        )}

        {tab === 'register' && (
          <div>
            <h2 style={{fontSize:'16px', fontWeight:'700', margin:'0 0 1.25rem'}}>Firmenkonto erstellen</h2>
            <label style={labelStyle}>Firmenname *</label>
            <input style={inputStyle} placeholder="z.B. Autohaus Müller AG" value={form.company_name} onChange={e => update('company_name', e.target.value)} />
            <label style={labelStyle}>Kanton *</label>
            <select style={inputStyle} value={form.canton} onChange={e => update('canton', e.target.value)}>
              <option value="">Kanton wählen</option>
              <option>Zürich</option>
              <option>Bern</option>
              <option>Basel</option>
              <option>Luzern</option>
              <option>Aargau</option>
              <option>St. Gallen</option>
              <option>Genf</option>
            </select>
            <label style={labelStyle}>Branche</label>
            <select style={inputStyle} value={form.industry} onChange={e => update('industry', e.target.value)}>
              <option value="">Branche wählen</option>
              <option>Autogarage</option>
              <option>Autohandel</option>
              <option>Carrosserie</option>
              <option>Nutzfahrzeuge</option>
              <option>Importeur</option>
            </select>
            <label style={labelStyle}>E-Mail *</label>
            <input style={inputStyle} type="email" placeholder="firma@email.ch" value={form.email} onChange={e => update('email', e.target.value)} />
            <label style={labelStyle}>Passwort *</label>
            <input style={inputStyle} type="password" placeholder="Mindestens 6 Zeichen" value={form.password} onChange={e => update('password', e.target.value)} />
            {error && <p style={{color:'#A32D2D', fontSize:'12px', margin:'0 0 10px'}}>{error}</p>}
            <button
              onClick={handleRegister}
              style={{width:'100%', background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontSize:'14px', fontWeight:'500', cursor:'pointer'}}
            >
              {loading ? 'Wird registriert...' : 'Konto erstellen'}
            </button>
          </div>
        )}
      </div>

      <p style={{textAlign:'center', fontSize:'12px', color:'#999', marginTop:'1rem'}}>
        <Link href="/jobs" style={{color:'#D85A30', textDecoration:'none'}}>← Zurück zu den Jobs</Link>
      </p>
    </main>
  )
}