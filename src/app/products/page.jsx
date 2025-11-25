import Link from "next/link";

export default async function ProductPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return (
    <div>
      <h1>Product page</h1>
      <div className="flex flex-col p-4">
        {data.map((user) => (
          <Link key={user.id} href={`/products/${user.id}`}>{user.username}</Link>
        ))}
      </div>
    </div>
  );
}
