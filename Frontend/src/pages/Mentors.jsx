import AdminLayout from "../layouts/AdminLayout";

function Mentors() {

const mentors = [
  {
    name: "Ahmed Samir",
    field: "Web Development",
    rating: "4.9",
    sessions: 42
  },
  {
    name: "Nour Emad",
    field: "Data Analysis",
    rating: "4.8",
    sessions: 35
  },
  {
    name: "Mona Adel",
    field: "UI/UX Design",
    rating: "4.7",
    sessions: 28
  }
];

return (
<AdminLayout>

<div style={{ marginBottom: "24px" }}>
<h1 style={{ fontSize: "26px", margin: 0 }}>
Mentor Monitoring
</h1>

<p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
View mentor profiles, specialization, ratings, and activity.
</p>
</div>

<div style={{
background:"rgba(255,255,255,0.03)",
border:"1px solid rgba(255,255,255,0.05)",
borderRadius:"20px",
padding:"24px"
}}>

<table style={{ width:"100%", borderCollapse:"collapse" }}>

<thead>
<tr style={{ fontSize:"12px", color:"rgba(255,255,255,0.55)" }}>
<th align="left">Mentor</th>
<th align="left">Specialization</th>
<th align="left">Rating</th>
<th align="left">Sessions</th>
<th align="left">Actions</th>
</tr>
</thead>

<tbody>

{mentors.map(mentor => (

<tr key={mentor.name}
style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}
>

<td style={{ padding:"14px 0", fontWeight:"600" }}>
{mentor.name}
</td>

<td style={{ color:"rgba(255,255,255,0.75)" }}>
{mentor.field}
</td>

<td style={{ color:"#F5A100", fontWeight:"600" }}>
⭐ {mentor.rating}
</td>

<td style={{ color:"rgba(255,255,255,0.75)" }}>
{mentor.sessions}
</td>

<td>

<button style={{
padding:"6px 12px",
borderRadius:"10px",
border:"1px solid rgba(255,255,255,0.08)",
background:"transparent",
color:"#fff",
cursor:"pointer"
}}>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</AdminLayout>
);
}

export default Mentors;