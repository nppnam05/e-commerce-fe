import { Star } from "@/components/ui/stars"
import { color_zinc } from "@/consts/colors"
import { Check, Ellipsis } from "lucide-react"

interface CommentInput extends React.HTMLAttributes<HTMLDivElement> {
  countStar: number,
  name: String,
  comment: String,
  datePost: Date,
  isBought: boolean
}


export default function Comment({ countStar, name, comment, datePost, isBought, className }: CommentInput) {
  return <div className={`p-4 rounded-3xl border border-zinc-400 ${className}`}>
    <div className="flex flex-row justify-between mb-4">
      <Star className="text-yellow-300" count={countStar} widthSize={24} isShowNumber={false} />
      <Ellipsis width={24} color={color_zinc[400]} />
    </div>
    <div className="flex flex-row gap-2 w-fit mb-4">

      <span className="text-2xl">{name}</span>
      {isBought && <div className="p-2 rounded-3xl bg-green-400 w-6 h-6"><Check className="w-full h-full text-zinc-100" /></div>}
    </div>
    <div className="text-base text-zince-400 mb-8">
      {comment}
    </div>
    <div className="text-base text-zince-500">
      Post on {datePost.toDateString()}
    </div>

  </div>
}
