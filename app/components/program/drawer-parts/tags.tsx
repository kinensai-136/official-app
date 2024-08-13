type Props = {
  children: string[]
}

export function Tags({ children }: Props) {
  return (
    <ul className="flex flex-wrap gap-1">
      {children.map((tag) => (
        <li
          key={tag}
          className="inline-block whitespace-nowrap rounded-full bg-dark-300 px-3 py-px font-medium text-primary-500"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
