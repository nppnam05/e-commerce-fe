// import { BadgeSelector } from "@/components/ui/badge-selector";
// import { Button } from "@/components/ui/button";
// import { ColorPallete, type ColorInput } from "@/components/ui/color-pallete";
// import { CountSelector } from "@/components/ui/count-selector";
// import { RowDivident } from "@/components/ui/row-divident";
// import { Star } from "@/components/ui/stars";
// import { color_zinc } from "@/consts/colors";
// import { useContext, useState } from "react";
// import colors from "tailwindcss/colors";
//
// const colorsInput: ColorInput[] = [
//   {
//     backgroundColor: colors.green[600],
//     outlineColor: colors.green[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.red[600],
//     outlineColor: colors.red[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.yellow[600],
//     outlineColor: colors.yellow[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.orange[600],
//     outlineColor: colors.orange[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.cyan[600],
//     outlineColor: colors.cyan[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.blue[600],
//     outlineColor: colors.blue[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.purple[600],
//     outlineColor: colors.purple[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.pink[600],
//     outlineColor: colors.pink[900],
//     checkColor: colors.white,
//   },
//   {
//     backgroundColor: colors.white,
//     outlineColor: colors.zinc[300],
//     checkColor: colors.zinc[900],
//   },
//   {
//     backgroundColor: colors.zinc[900],
//     outlineColor: colors.zinc[800],
//     checkColor: colors.white,
//   },
// ];
//
// export default function ProductDetail() {
//   const [selectedColor, setSelectedColor] = useState(colors.white);
//
//
//   return isFetchingProduct ? (
//     <div></div>
//   ) : (
//     <div className="grid grid-cols-3 grid-rows-7 gap-2 lg:grid-cols-9 lg:grid-rows-3">
//       <img
//         src={product?.imageUrls[0]}
//         className="col-start-1 row-start-4 aspect-square lg:col-start-1 lg:row-start-1"
//       />
//       <img
//         src={product?.imageUrls[0]}
//         className="col-start-2 row-start-4 aspect-square lg:col-start-1 lg:row-start-2"
//       />
//       <img
//         src={product?.imageUrls[0]}
//         className="col-start-3 row-start-4 aspect-square lg:col-start-1 lg:row-start-3"
//       />
//       <img
//         src={product?.imageUrls[0]}
//         className="col-span-3 col-start-1 row-span-3 row-start-1 aspect-square lg:col-start-2 lg:row-start-1"
//       />
//       <div className="col-start-1 -col-end-1 row-start-5 -row-end-1 flex flex-col justify-between gap-2 px-4 lg:col-start-5 lg:row-start-1">
//         <h1 className="text-5xl font-bold uppercase">{product?.name}</h1>
//         <Star count={4.5} widthSize={30} className="text-yellow-300" />
//         <span className="text-4xl font-bold">${product?.price}</span>
//         <span className="text-lg">{product?.description}</span>
//         <RowDivident />
//         <div>
//           <div className="mb-2 text-2xl text-zinc-400">Select Colors</div>
//           <ColorPallete
//             colors={colorsInput}
//             valueChanged={setSelectedColor}
//             selectColor={selectedColor}
//             className="flex flex-row flex-wrap gap-4"
//             colorWidthHeight={32}
//           />
//         </div>
//         <RowDivident />
//         <div>
//           <div className="mb-2 text-2xl text-zinc-400">Select Size</div>
//           <BadgeSelector
//             value="Small"
//             texts={["Small", "Medium", "Large", "X-Large"]}
//             defaultTextColor={color_zinc[800]}
//             defaultBackgroundColor={color_zinc[100]}
//             selectedTextColor="#FFFFFF"
//             selectedBackgroundColor="#000000"
//             fontSize={20}
//             gap={8}
//             onChanged={(a) => console.log(a)}
//           />
//         </div>
//         <RowDivident />
//         <div className="flex flex-row gap-4">
//           <CountSelector value={countOrdered} onChanged={setCountOrdered} />
//           <Button
//             variant="superBlack"
//             className="w-full"
//             onClick={createCart}
//             isLoading={isLoadingCreateCart}
//           >
//             Add To Cart
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
