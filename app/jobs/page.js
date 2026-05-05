'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import Link from 'next/link'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [kanton, setKanton] = useState('')
  const [kategorie, setKategorie] = useState('')

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    setLoading(true)
    let query = supabase.from('jobs').select('*').eq('status', 'active')
    if (kanton) query = query.eq('canton', kanton)
    if (kategorie) query = query.eq('category', kategorie)
    if (search) query = query.ilike('title', `%${search}%`)
    const { data } = await query.order('created_at', { ascending: false })
    setJobs(data || [])
    setLoading(false)
  }

  return (
    <main style={{fontFamily:'sans-serif', maxWidth:'900px', margin:'0 auto', padding:'2rem'}}>

      {/* Navigation */}
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', borderBottom:'1px solid #eee', paddingBottom:'1rem'}}>
        <Link href="/" style={{fontWeight:'700', fontSize:'20px', textDecoration:'none', color:'#000'}}>
          autojobs<span style={{color:'#D85A30'}}>.ch</span>
        </Link>
        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          <Link href="/jobs" style={{color:'#D85A30', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>Jobs</Link>
          <Link href="/preise" style={{color:'#666', textDecoration:'none', fontSize:'14px'}}>Preise</Link>
          <Link href="/inserat" style={{background:'#D85A30', color:'#fff', padding:'7px 16px', borderRadius:'8px', textDecoration:'none', fontSize:'13px', fontWeight:'500'}}>Inserieren</Link>
        </div>
      </nav>

      {/* Suchleiste */}
      <div style={{display:'flex', gap:'8px', marginBottom:'1.5rem', background:'#fff', border:'1px solid #ddd', borderRadius:'12px', padding:'6px'}}>
        <input
          type="text"
          placeholder="Jobtitel, Berufsfeld..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{flex:2, border:'none', outline:'none', fontSize:'14px', padding:'6px 10px', background:'transparent'}}
        />
        <div style={{width:'1px', background:'#eee'}}></div>
        <select
          value={kanton}
          onChange={(e) => setKanton(e.target.value)}
          style={{flex:1, border:'none', outline:'none', fontSize:'14px', padding:'6px 10px', background:'transparent', color:'#666'}}
        >
          <option value="">Alle Kantone</option>
          <option>Zürich</option>
          <option>Bern</option>
          <option>Basel</option>
          <option>Luzern</option>
          <option>Aargau</option>
          <option>St. Gallen</option>
        </select>
        <div style={{width:'1px', background:'#eee'}}></div>
        <select
          value={kategorie}
          onChange={(e) => setKategorie(e.target.value)}
          style={{flex:1, border:'none', outline:'none', fontSize:'14px', padding:'6px 10px', background:'transparent', color:'#666'}}
        >
          <option value="">Alle Kategorien</option>
          <option>Mechanik</option>
          <option>Fahrzeugverkauf</option>
          <option>Karosserie & Lack</option>
          <option>Elektrik / E-Mobility</option>
          <option>Serviceberatung</option>
          <option>Administration</option>
        </select>
        <button
          onClick={fetchJobs}
          style={{background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'8px 20px', fontSize:'14px', fontWeight:'500', cursor:'pointer'}}
        >
          Suchen
        </button>
      </div>

      {/* Ergebnisse */}
      {loading ? (
        <p style={{color:'#999', textAlign:'center'}}>Jobs werden geladen...</p>
      ) : jobs.length === 0 ? (
        <div style={{textAlign:'center', padding:'3rem', color:'#999'}}>
          <p style={{fontSize:'24px'}}>🔍</p>
          <p>Noch keine Jobs vorhanden.</p>
          <Link href="/inserat" style={{color:'#D85A30'}}>Jetzt erstes Inserat schalten →</Link>
        </div>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} style={{textDecoration:'none'}}>
              <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1rem 1.25rem', cursor:'pointer', borderLeft: job.package === 'professional' || job.package === 'premium' ? '3px solid #D85A30' : '1px solid #eee'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div>
                    <p style={{fontSize:'15px', fontWeight:'500', margin:'0 0 4px', color:'#000'}}>{job.title}</p>
                    <p style={{fontSize:'12px', color:'#666', margin:'0 0 8px'}}>{job.company} · {job.location}</p>
                    <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                      <span style={{fontSize:'11px', padding:'2px 8px', borderRadius:'20px', background:'#f5f5f5', color:'#666'}}>📍 {job.canton}</span>
                      <span style={{fontSize:'11px', padding:'2px 8px', borderRadius:'20px', background:'#f5f5f5', color:'#666'}}>⏱ {job.pensum}</span>
                      <span style={{fontSize:'11px', padding:'2px 8px', borderRadius:'20px', background:'#f5f5f5', color:'#666'}}>{job.category}</span>
                    </div>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'6px'}}>
                    {(job.package === 'professional' || job.package === 'premium') && (
                      <span style={{fontSize:'11px', padding:'2px 8px', borderRadius:'20px', background:'#FAEEDA', color:'#854F0B'}}>Top Inserat</span>
                    )}
                    <span style={{fontSize:'11px', color:'#999'}}>
                      {new Date(job.created_at).toLocaleDateString('de-CH')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}