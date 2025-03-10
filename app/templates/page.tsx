"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronLeft, Search, Filter, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Template data structure
interface Template {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  thumbnailUrl: string
  slides: number
  popular: boolean
}

// Sample template data
const templates: Template[] = [
  {
    id: "business-pitch",
    title: "Business Pitch Deck",
    description: "Perfect for startups seeking investment or presenting business ideas",
    category: "business",
    tags: ["pitch", "startup", "investment"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 12,
    popular: true,
  },
  {
    id: "marketing-plan",
    title: "Marketing Strategy",
    description: "Present your marketing campaigns and strategies effectively",
    category: "business",
    tags: ["marketing", "strategy", "campaign"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 10,
    popular: false,
  },
  {
    id: "quarterly-report",
    title: "Quarterly Business Report",
    description: "Share financial results and business performance",
    category: "business",
    tags: ["report", "finance", "quarterly"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 15,
    popular: true,
  },
  {
    id: "creative-portfolio",
    title: "Creative Portfolio",
    description: "Showcase your creative work with this visually stunning template",
    category: "creative",
    tags: ["portfolio", "design", "creative"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 8,
    popular: true,
  },
  {
    id: "product-launch",
    title: "Product Launch",
    description: "Introduce your new product with impact and style",
    category: "business",
    tags: ["product", "launch", "marketing"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 10,
    popular: true,
  },
  {
    id: "educational-course",
    title: "Educational Course",
    description: "Perfect for teachers and trainers presenting educational content",
    category: "education",
    tags: ["education", "course", "training"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 20,
    popular: false,
  },
  {
    id: "research-presentation",
    title: "Research Findings",
    description: "Present your research findings in a clear, academic format",
    category: "education",
    tags: ["research", "academic", "data"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 18,
    popular: false,
  },
  {
    id: "minimal-portfolio",
    title: "Minimal Portfolio",
    description: "A clean, minimalist approach to showcase your work",
    category: "creative",
    tags: ["portfolio", "minimal", "clean"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 12,
    popular: true,
  },
  {
    id: "annual-report",
    title: "Annual Report",
    description: "Comprehensive template for annual business reporting",
    category: "business",
    tags: ["annual", "report", "business"],
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
    slides: 25,
    popular: false,
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  // Get unique categories
  const categories = ["all", ...new Set(templates.map((template) => template.category))]

  // Filter templates based on search query and selected category
  const filterTemplates = (category: string) => {
    let filtered = templates

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (template) =>
          template.title.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (category !== "all") {
      filtered = filtered.filter((template) => template.category === category)
    }

    return filtered
  }

  const handleUseTemplate = (template: Template) => {
    // In a real app, this would create a new presentation with the template
    router.push(`/create?template=${template.id}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-4">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-xl font-semibold">Presentation Templates</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterTemplates(category).map((template) => (
                  <Card key={template.id} className="overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={template.thumbnailUrl || "/placeholder.svg"}
                        alt={template.title}
                        width={600}
                        height={400}
                        className="w-full aspect-[3/2] object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedTemplate(template)
                            setPreviewOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" onClick={() => handleUseTemplate(template)}>
                          Use Template
                        </Button>
                      </div>
                      {template.popular && <Badge className="absolute top-2 right-2 bg-primary">Popular</Badge>}
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-lg mb-1">{template.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{template.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{template.slides} slides</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{template.category}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-4 flex gap-2">
                      {template.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filterTemplates(category).length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No templates found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Template Preview Dialog */}
      {selectedTemplate && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedTemplate.title}</DialogTitle>
              <DialogDescription>{selectedTemplate.description}</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="relative w-full aspect-[16/9] bg-muted rounded-lg overflow-hidden mb-4">
                <Image
                  src={selectedTemplate.thumbnailUrl || "/placeholder.svg"}
                  alt={selectedTemplate.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[16/9] bg-muted rounded-md overflow-hidden">
                    <Image
                      src={selectedTemplate.thumbnailUrl || "/placeholder.svg"}
                      alt={`Slide preview ${i + 1}`}
                      width={200}
                      height={120}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <span>{selectedTemplate.slides} slides</span>
                <span className="mx-2">•</span>
                <span className="capitalize">{selectedTemplate.category}</span>
                <span className="mx-2">•</span>
                <span>Last updated: March 2023</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUseTemplate(selectedTemplate)}>Use This Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

