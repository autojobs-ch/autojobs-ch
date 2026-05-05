'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [beworben, setBeworben] = useState(false)
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:'', message:'' })

  useEffect(() => {
    fetchJob()
  }, [id])

  async function fetchJob() {
    const { data } = await supabase.from('jobs').select('*').eq('id', id).single()
    setJob(data)
    setLoading(false)
  }

  async function bewerben() {
    await supabase.from('applications').insert({
      job_id: id,
      ...form
    })
    setBeworben(true)
  }

  if (loading) return <p style={{textAlign:'center', padding:'2rem', fontFamily:'sans-serif'}}>Wird geladen...</p>
  if (!job) return <p style={{textAlign:'center', padding:'2rem', fontFamily:'sans-serif'}}>Job nicht gefunden.</p>

  return (
    <main style={{fontFamily:'sans-serif', maxWidth:'900px', margin:'0 auto', padding:'2rem'}}>

      {/* Navigation */}
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', borderBottom:'1px solid #eee', paddingBottom:'1rem'}}>
        <Link href="/" style={{fontWeight:'700', fontSize:'20px', textDecoration:'none', color:'#000'}}>
          autojobs<span style={{color:'#D85A30'}}>.ch</span>
        </Link>
        <Link href="/jobs" style={{color:'#666', textDecoration:'none', fontSize:'14px'}}>← Zurück zu Jobs</Link>
      </nav>

      <div style={{display:'grid', gridTemplateColumns:'1fr 300px', gap:'1.5rem'}}>

        {/* Linke Seite */}
        <div>
          <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
            <p style={{fontSize:'12px', color:'#999', margin:'0 0 4px', textTransform:'uppercase', letterSpacing:'0.05em'}}>Stellenanzeige</p>
            <h1 style={{fontSize:'22px', fontWeight:'700', margin:'0 0 4px'}}>{job.title}</h1>
            <p style={{fontSize:'14px', color:'#666', margin:'0 0 1rem'}}>{job.company}</p>
            <div style={{display:'flex', gap:'12px', flexWrap:'wrap', padding:'1rem 0', borderTop:'1px solid #eee', borderBottom:'1px solid #eee', margin:'1rem 0'}}>
              <span style={{fontSize:'13px', color:'#666'}}>📍 {job.location}, {job.canton}</span>
              <span style={{fontSize:'13px', color:'#666'}}>⏱ {job.pensum}</span>
              <span style={{fontSize:'13px', color:'#666'}}>💼 {job.employment_type}</span>
            </div>
            {(job.package === 'professional' || job.package === 'premium') && (
              <span style={{fontSize:'11px', padding:'2px 10px', borderRadius:'20px', background:'#FAEEDA', color:'#854F0B'}}>Top Inserat</span>
            )}
          </div>

          {job.description && (
            <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
              <h2 style={{fontSize:'15px', fontWeight:'700', margin:'0 0 0.75rem'}}>Aufgaben</h2>
              <p style={{fontSize:'13px', lineHeight:'1.7', color:'#333', whiteSpace:'pre-line'}}>{job.description}</p>
            </div>
          )}

          {job.requirements && (
            <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
              <h2 style={{fontSize:'15px', fontWeight:'700', margin:'0 0 0.75rem'}}>Anforderungen</h2>
              <p style={{fontSize:'13px', lineHeight:'1.7', color:'#333', whiteSpace:'pre-line'}}>{job.requirements}</p>
            </div>
          )}

          {job.benefits && (
            <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
              <h2 style={{fontSize:'15px', fontWeight:'700', margin:'0 0 0.75rem'}}>Wir bieten</h2>
              <p style={{fontSize:'13px', lineHeight:'1.7', color:'#333', whiteSpace:'pre-line'}}>{job.benefits}</p>
            </div>
          )}
        </div>

        {/* Rechte Seite */}
        <div>
          {beworben ? (
            <div style={{background:'#EAF3DE', border:'1px solid #B8DCA0', borderRadius:'12px', padding:'1.5rem', textAlign:'center'}}>
              <p style={{fontSize:'24px', margin:'0 0 0.5rem'}}>✅</p>
              <p style={{fontWeight:'700', color:'#3B6D11', margin:'0 0 0.5rem'}}>Bewerbung gesendet!</p>
              <p style={{fontSize:'12px', color:'#3B6D11', margin:'0'}}>Die Firma meldet sich direkt bei dir.</p>
            </div>
          ) : (
            <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1.25rem', position:'sticky', top:'1rem'}}>
              <p style={{fontSize:'14px', fontWeight:'500', margin:'0 0 1rem'}}>Jetzt bewerben</p>
              <div style={{marginBottom:'0.75rem'}}>
                <input placeholder="Vorname" value={form.first_name} onChange={e => setForm({...form, first_name:e.target.value})} style={{width:'100%', padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', boxSizing:'border-box', marginBottom:'8px'}}/>
                <input placeholder="Nachname" value={form.last_name} onChange={e => setForm({...form, last_name:e.target.value})} style={{width:'100%', padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', boxSizing:'border-box', marginBottom:'8px'}}/>
                <input placeholder="E-Mail" value={form.email} onChange={e => setForm({...form, email:e.target.value})} style={{width:'100%', padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', boxSizing:'border-box', marginBottom:'8px'}}/>
                <input placeholder="Telefon (optional)" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} style={{width:'100%', padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', boxSizing:'border-box', marginBottom:'8px'}}/>
                <textarea placeholder="Kurzes Anschreiben..." value={form.message} onChange={e => setForm({...form, message:e.target.value})} style={{width:'100%', padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'13px', boxSizing:'border-box', minHeight:'80px', resize:'vertical'}}/>
              </div>
              <button onClick={bewerben} style={{width:'100%', background:'#D85A30', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontSize:'14px', fontWeight:'500', cursor:'pointer'}}>
                Bewerbung senden ↗
              </button>
              <p style={{fontSize:'11px', color:'#999', textAlign:'center', margin:'8px 0 0'}}>Wird direkt an die Firma gesendet</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}