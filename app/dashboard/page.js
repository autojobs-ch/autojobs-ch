'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [company, setCompany] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
    const { data: companyData } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', user.id)
      .single()
    setCompany(companyData)
    const { data: jobsData } = await supabase
      .from('jobs')
      .select('*')
      .eq('email', user.email)
      .order('created_at', { ascending: false })
    setJobs(jobsData || [])
    setLoading(false)
  }

  async function deleteJob(id) {
    await supabase.from('jobs').delete().eq('id', id)
    setJobs(jobs.filter(j => j.id !== id))
  }

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return (
    <main style={{fontFamily:'sans-serif', textAlign:'center', padding:'3rem'}}>
      <p style={{color:'#999'}}>Wird geladen...</p>
    </main>
  )

  return (
    <main style={{fontFamily:'sans-serif', maxWidth:'900px', margin:'0 auto', padding:'2rem'}}>

      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', borderBottom:'1px solid #eee', paddingBottom:'1rem'}}>
        <Link href="/" style={{fontWeight:'700', fontSize:'20px', textDecoration:'none', color:'#000'}}>
          autojobs<span style={{color:'#D85A30'}}>.ch</span>
        </Link>
        <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
          <span style={{fontSize:'13px', color:'#666'}}>{company?.name}</span>
          <button onClick={logout} style={{fontSize:'13px', padding:'6px 14px', border:'1px solid #ddd', borderRadius:'8px', background:'transparent', cursor:'pointer'}}>
            Ausloggen
          </button>
        </div>
      </nav>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
        <h1 style={{fontSize:'22px', fontWeight:'700', margin:'0'}}>Mein Dashboard</h1>
        <Link href="/inserat" style={{background:'#D85A30', color:'#fff', padding:'9px 20px', borderRadius:'8px', textDecoration:'none', fontSize:'13px', fontWeight:'500'}}>
          + Neues Inserat
        </Link>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'10px', marginBottom:'2rem'}}>
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1rem'}}>
          <p style={{fontSize:'11px', color:'#999', margin:'0 0 4px', textTransform:'uppercase'}}>Aktive Inserate</p>
          <p style={{fontSize:'28px', fontWeight:'500', margin:'0'}}>{jobs.filter(j => j.status === 'active').length}</p>
        </div>
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1rem'}}>
          <p style={{fontSize:'11px', color:'#999', margin:'0 0 4px', textTransform:'uppercase'}}>Total Inserate</p>
          <p style={{fontSize:'28px', fontWeight:'500', margin:'0'}}>{jobs.length}</p>
        </div>
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1rem'}}>
          <p style={{fontSize:'11px', color:'#999', margin:'0 0 4px', textTransform:'uppercase'}}>Kanton</p>
          <p style={{fontSize:'18px', fontWeight:'500', margin:'0'}}>{company?.canton || '–'}</p>
        </div>
      </div>

      <h2 style={{fontSize:'16px', fontWeight:'700', margin:'0 0 1rem'}}>Meine Inserate</h2>

      {jobs.length === 0 ? (
        <div style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'3rem', textAlign:'center'}}>
          <p style={{fontSize:'24px', margin:'0 0 0.5rem'}}>📄</p>
          <p style={{color:'#666', margin:'0 0 1rem'}}>Noch keine Inserate vorhanden.</p>
          <Link href="/inserat" style={{background:'#D85A30', color:'#fff', padding:'9px 20px', borderRadius:'8px', textDecoration:'none', fontSize:'13px', fontWeight:'500'}}>
            Erstes Inserat schalten
          </Link>
        </div>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          {jobs.map(job => (
            <div key={job.id} style={{background:'#fff', border:'1px solid #eee', borderRadius:'12px', padding:'1rem 1.25rem', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <p style={{fontSize:'14px', fontWeight:'500', margin:'0 0 3px'}}>{job.title}</p>
                <p style={{fontSize:'12px', color:'#666', margin:'0'}}>
                  {job.canton} · {job.pensum} · {new Date(job.created_at).toLocaleDateString('de-CH')}
                </p>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <span style={{fontSize:'11px', padding:'2px 8px', borderRadius:'20px', background: job.status === 'active' ? '#EAF3DE' : '#f5f5f5', color: job.status === 'active' ? '#3B6D11' : '#666'}}>
                  {job.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                </span>
                <button
                  onClick={() => deleteJob(job.id)}
                  style={{fontSize:'11px', padding:'4px 10px', border:'1px solid #ffcccc', borderRadius:'8px', background:'transparent', color:'#A32D2D', cursor:'pointer'}}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}