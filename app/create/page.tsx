"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Layout, LayoutDashboard, Plus, Settings, Trash2 } from "lucide-react"

export default function CreatePresentation() {
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Title Slide",
      content: "Welcome to your presentation",
      type: "title",
    },
    {
      id: 2,
      title: "Content Slide",
      content: "Add your content here",
      type: "content",
    },
  ])
  const [activeSlide, setActiveSlide] = useState(1)

  const addSlide = () => {
    const newSlide = {
      id: slides.length + 1,
      title: `Slide ${slides.length + 1}`,
      content: "Add your content here",
      type: "content",
    }
    setSlides([...slides, newSlide])
    setActiveSlide(newSlide.id)
  }

  const deleteSlide = (id: number) => {
    if (slides.length <= 1) return
    const newSlides = slides.filter((slide) => slide.id !== id)
    setSlides(newSlides)
    if (activeSlide === id) {
      setActiveSlide(newSlides[0].id)
    }
  }

  const updateSlideTitle = (id: number, title: string) => {
    const newSlides = slides.map((slide) => {
      if (slide.id === id) {
        return { ...slide, title }
      }
      return slide
    })
    setSlides(newSlides)
  }

  const updateSlideContent = (id: number, content: string) => {
    const newSlides = slides.map((slide) => {
      if (slide.id === id) {
        return { ...slide, content }
      }
      return slide
    })
    setSlides(newSlides)
  }

  const currentSlide = slides.find((slide) => slide.id === activeSlide) || slides[0]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 mr-4">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-semibold">Back</span>
          </Link>
          <div className="flex-1 flex items-center justify-center">
            <Input className="max-w-xs text-center" placeholder="Untitled Presentation" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">Present</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex">
        <div className="w-64 border-r bg-muted/40 p-4 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Slides</h2>
            <Button variant="ghost" size="icon" onClick={addSlide}>
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add slide</span>
            </Button>
          </div>
          <div className="space-y-2">
            {slides.map((slide) => (
              <Card
                key={slide.id}
                className={`cursor-pointer transition-colors ${activeSlide === slide.id ? "border-primary" : ""}`}
                onClick={() => setActiveSlide(slide.id)}
              >
                <CardContent className="p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {slide.type === "title" ? (
                      <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Layout className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm truncate">{slide.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSlide(slide.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Delete slide</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col">
          <Tabs defaultValue="edit" className="flex-1 flex flex-col">
            <div className="flex justify-center mb-4">
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="edit" className="flex-1 flex flex-col">
              <div className="grid gap-4 mb-4">
                <div>
                  <Label htmlFor="slide-title">Slide Title</Label>
                  <Input
                    id="slide-title"
                    value={currentSlide.title}
                    onChange={(e) => updateSlideTitle(currentSlide.id, e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="slide-content">Content</Label>
                  <textarea
                    id="slide-content"
                    className="w-full min-h-[200px] p-2 border rounded-md"
                    value={currentSlide.content}
                    onChange={(e) => updateSlideContent(currentSlide.id, e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="flex-1 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="w-full max-w-3xl aspect-[16/9] bg-background rounded-lg shadow-lg p-8 flex flex-col">
                {currentSlide.type === "title" ? (
                  <>
                    <h1 className="text-4xl font-bold text-center mb-8">{currentSlide.title}</h1>
                    <p className="text-xl text-center text-muted-foreground">{currentSlide.content}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold mb-6">{currentSlide.title}</h2>
                    <p className="text-lg">{currentSlide.content}</p>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

