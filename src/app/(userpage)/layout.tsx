export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>여기가 레이아웃</div>
      {children}
    </section>
  );
}
