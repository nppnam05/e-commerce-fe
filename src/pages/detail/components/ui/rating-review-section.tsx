// import { Button } from "@/components/ui/button";
// import { DropdownButton } from "@/components/ui/dropdown-button";
// import { SlidersVertical } from "lucide-react";
// import Comment from "./comment";
// import { HomeItemsSection } from "@/pages/home/components/ui/home-items-section";
// import { useContext } from "react";
//
// const fakeData = {
//   name: "Alaka",
//   comment: "oka",
//   isBought: true,
//   datePost: new Date(Date.now()),
//   countStar: 5,
// };
// const fakeDatas = Array.from(Array(6), () => fakeData);
//
// export default function RatingAndReviewSection() {
//   const context = useContext(DetailContext);
//   if (context == null) {
//     throw new Error("Detial context cannot be null");
//   }
//
//   const {
//     relatedProducts,
//     isLoadingRelatedProducts,
//     isFetchingRelatedProducts,
//   } = context;
//
//   return (
//     <>
//       <div className="mb-2 text-3xl font-bold">Rating and Reviews</div>
//       <div className="flex flex-row justify-between">
//         <div className="flex w-fit flex-row items-center gap-2">
//           <span className="text-xl font-bold">All Review</span>
//           <span className="text-base text-zinc-200">(456)</span>
//         </div>
//         <div className="flex w-fit flex-row items-center gap-2">
//           <div className="w-fit rounded-2xl bg-zinc-200 p-2">
//             <SlidersVertical width={22} height={24} />
//           </div>
//           <div className="w-fit rounded-2xl bg-zinc-200 p-2">
//             <DropdownButton name="Lastest" className="text-base">
//               <div className="h-7 w-3xs">hello</div>
//             </DropdownButton>
//           </div>
//           <Button variant="superBlack"> Write a Review</Button>
//         </div>
//       </div>
//
//       <div className="mb-16 grid grid-cols-1 gap-4 lg:grid-cols-2">
//         {fakeDatas.map((data, index) => (
//           <Comment
//             comment={data.comment}
//             countStar={data.countStar}
//             datePost={data.datePost}
//             isBought={data.isBought}
//             name={data.name}
//             key={index}
//             className="w-full"
//           />
//         ))}
//       </div>
//
//       <div className="mb-48 flex justify-center">
//         <Button variant="primary">Load More Reviews</Button>
//       </div>
//
//       <HomeItemsSection
//         name="You Might Also Like"
//         products={relatedProducts}
//         isLoading={isLoadingRelatedProducts}
//         isFetching={isFetchingRelatedProducts}
//       />
//     </>
//   );
// }
