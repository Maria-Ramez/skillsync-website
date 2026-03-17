import AdminLayout from "../layouts/AdminLayout";

function CareerPaths(){

const careers=[
{path:"Frontend Developer",skills:"HTML, CSS, React",resources:"YouTube, Coursera"},
{path:"Data Analyst",skills:"Excel, SQL, Python",resources:"Coursera, Udemy"},
{path:"AI Engineer",skills:"Python, ML, Deep Learning",resources:"YouTube, Kaggle"}
]

return(
<AdminLayout>

<div style={{marginBottom:"24px"}}>
<h1 style={{fontSize:"26px",margin:0}}>Career Paths & Skills</h1>
<p style={{color:"rgba(255,255,255,0.6)",fontSize:"14px"}}>
Manage career tracks, required skills, and learning resources.
</p>
</div>

<div style={{
background:"rgba(255,255,255,0.03)",
border:"1px solid rgba(255,255,255,0.05)",
borderRadius:"20px",
padding:"24px"
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
}}>

<h3 style={{fontSize:"18px",margin:0}}>Career Paths</h3>

<button style={{
padding:"10px 16px",
borderRadius:"12px",
border:"none",
background:"#F5A100",
fontWeight:"600",
cursor:"pointer"
}}>
Add Career Path
</button>

</div>

<table style={{width:"100%",borderCollapse:"collapse"}}>

<thead>
<tr style={{fontSize:"12px",color:"rgba(255,255,255,0.55)"}}>
<th align="left">Career Path</th>
<th align="left">Required Skills</th>
<th align="left">Resources</th>
<th align="left">Actions</th>
</tr>
</thead>

<tbody>

{careers.map(career=>(
<tr key={career.path}
style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}
>

<td style={{padding:"14px 0",fontWeight:"600"}}>
{career.path}
</td>

<td style={{color:"rgba(255,255,255,0.75)"}}>
{career.skills}
</td>

<td style={{color:"rgba(255,255,255,0.75)"}}>
{career.resources}
</td>

<td>
<div style={{display:"flex",gap:"8px"}}>

<button style={{
padding:"6px 12px",
borderRadius:"10px",
border:"1px solid rgba(255,255,255,0.08)",
background:"transparent",
color:"#fff",
cursor:"pointer"
}}>
Edit
</button>

<button style={{
padding:"6px 12px",
borderRadius:"10px",
border:"1px solid rgba(255,255,255,0.08)",
background:"transparent",
color:"#ff7d7d",
cursor:"pointer"
}}>
Delete
</button>

</div>
</td>

</tr>
))}

</tbody>
</table>

</div>

</AdminLayout>
)
}

export default CareerPaths