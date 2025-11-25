
export default async function ProductId({ params }) {
     const { id } = await params
     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
     const data = await res.json()

  return (
    <div>Product details:  {data.name}</div>
  )
}
