import { db } from "@/app/lib/db";

export default async function DashboardPage() {
  const [postCount, publishedCount, categoryCount, tagCount] =
    await Promise.all([
      db.post.count(),
      db.post.count({ where: { published: true } }),
      db.category.count(),
      db.tag.count(),
    ]);

  const stats = [
    {
      label: "文章总数",
      value: postCount,
      color: "bg-indigo-500",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      label: "已发布",
      value: publishedCount,
      color: "bg-emerald-500",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "分类",
      value: categoryCount,
      color: "bg-violet-500",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      ),
    },
    {
      label: "标签",
      value: tagCount,
      color: "bg-amber-500",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">
                {stat.label}
              </span>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <span className="text-indigo-500">{stat.icon}</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 最近文章 */}
      <RecentPosts />
    </div>
  );
}

async function RecentPosts() {
  const posts = await db.post.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: { category: true },
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">最近更新的文章</h3>
        <a
          href="/admin/posts"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          查看全部 &rarr;
        </a>
      </div>
      {posts.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-gray-400 mb-2">暂无文章</p>
          <a
            href="/admin/posts/new"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            + 写第一篇
          </a>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {posts.map((post) => (
            <li
              key={post.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">
                  {post.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  {post.category && (
                    <span className="text-xs text-gray-400">{post.category.name}</span>
                  )}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.published
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {post.published ? "已发布" : "草稿"}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-400 ml-4 shrink-0">
                {new Date(post.updatedAt).toLocaleDateString("zh-CN")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}