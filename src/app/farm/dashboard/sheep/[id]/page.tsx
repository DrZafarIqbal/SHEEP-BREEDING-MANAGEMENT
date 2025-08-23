// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft } from "lucide-react"
// import { SheepDetail } from "@/components/sheep-detail"
// import { RecordTabs } from "@/components/record-tabs"
// import { getSheepById } from "@/lib/sheep-api"
// import type { Sheep } from "@/app/page"

// export default function SheepDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const [sheep, setSheep] = useState<Sheep | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   const sheepId = params.id as string

//   useEffect(() => {
//     const loadSheep = async () => {
//       try {
//         setLoading(true)
//         const sheepData = await getSheepById(sheepId)
//         setSheep(sheepData)
//       } catch (err) {
//         console.error("Failed to load sheep:", err)
//         setError("Failed to load sheep details")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (sheepId) {
//       loadSheep()
//     }
//   }, [sheepId])

//   if (loading) {
//     return (
//       <div className="p-4">
//         <div className="text-center py-8">
//           <p>Loading sheep details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error || !sheep) {
//     return (
//       <div className="p-4">
//         <div className="text-center py-8">
//           <p className="text-red-600">{error || "Sheep not found"}</p>
//           <Button onClick={() => router.push("/")} className="mt-4">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Dashboard
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="outline" onClick={() => router.push("/")} className="flex items-center gap-2">
//           <ArrowLeft className="h-4 w-4" />
//           Back to Dashboard
//         </Button>
//         <h1 className="text-2xl font-bold">Sheep Details - Tag: {sheep.tag_number}</h1>
//       </div>

//       <SheepDetail sheep={sheep} />
//       <RecordTabs sheepId={sheepId} />
//     </div>
//   )
// }
