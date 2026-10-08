import Link from 'next/link'
import { breadcrumbJsonLd, JsonLd, type BreadcrumbItem } from '@/lib/seo'

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const current = index === items.length - 1
            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {current ? (
                  <span aria-current="page" className="text-text">{item.name}</span>
                ) : (
                  <Link href={item.path} className="rounded hover:text-text focus-visible:outline">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
