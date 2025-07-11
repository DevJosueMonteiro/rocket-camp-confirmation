"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  Trash2,
  Rocket,
  Users,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Plus,
  Mail,
  Phone,
  Calendar,
  Star,
  Zap,
  Flame,
  Sparkles,
  Moon,
  Sun,
  ArrowUpDown,
  Edit,
  Eye,
  UserPlus,
  FileText,
  BarChart3,
  Settings,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"

interface Participant {
  id: number
  name: string
  confirmed: boolean
  reason: string
  email?: string
  phone?: string
  age?: number
  registrationDate: string
  priority: "high" | "medium" | "low"
  notes?: string
}

type SortField = "name" | "confirmed" | "registrationDate" | "priority"
type SortOrder = "asc" | "desc"

export default function Component() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "Miguel",
      confirmed: true,
      reason: "Confirmado via WhatsApp",
      email: "miguel@email.com",
      phone: "(11) 99999-0001",
      age: 15,
      registrationDate: "2024-06-15",
      priority: "high",
      notes: "Participante veterano",
    },
    {
      id: 2,
      name: "Maria Clara",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "maria.clara@email.com",
      phone: "(11) 99999-0002",
      age: 14,
      registrationDate: "2024-06-16",
      priority: "high",
    },
    {
      id: 3,
      name: "Cláudio",
      confirmed: false,
      reason: "Aguardando confirmação dos pais",
      email: "claudio@email.com",
      phone: "(11) 99999-0003",
      age: 16,
      registrationDate: "2024-06-17",
      priority: "medium",
    },
    {
      id: 4,
      name: "Enzo",
      confirmed: true,
      reason: "Confirmado via email",
      email: "enzo@email.com",
      phone: "(11) 99999-0004",
      age: 15,
      registrationDate: "2024-06-18",
      priority: "high",
    },
    {
      id: 5,
      name: "Mariana",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "mariana@email.com",
      phone: "(11) 99999-0005",
      age: 14,
      registrationDate: "2024-06-19",
      priority: "medium",
    },
    {
      id: 6,
      name: "Ana Vitória",
      confirmed: false,
      reason: "Conflito de agenda",
      email: "ana.vitoria@email.com",
      phone: "(11) 99999-0006",
      age: 15,
      registrationDate: "2024-06-20",
      priority: "low",
    },
    {
      id: 7,
      name: "Lucas Daniel",
      confirmed: true,
      reason: "Confirmado via telefone",
      email: "lucas.daniel@email.com",
      phone: "(11) 99999-0007",
      age: 16,
      registrationDate: "2024-06-21",
      priority: "high",
    },
    {
      id: 8,
      name: "Beatriz",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "beatriz@email.com",
      phone: "(11) 99999-0008",
      age: 14,
      registrationDate: "2024-06-22",
      priority: "medium",
    },
    {
      id: 9,
      name: "Alice",
      confirmed: true,
      reason: "Confirmado via WhatsApp",
      email: "alice@email.com",
      phone: "(11) 99999-0009",
      age: 15,
      registrationDate: "2024-06-23",
      priority: "high",
    },
    {
      id: 10,
      name: "Nathan",
      confirmed: false,
      reason: "Aguardando resposta",
      email: "nathan@email.com",
      phone: "(11) 99999-0010",
      age: 16,
      registrationDate: "2024-06-24",
      priority: "medium",
    },
    {
      id: 11,
      name: "Gabriel",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "gabriel@email.com",
      phone: "(11) 99999-0011",
      age: 15,
      registrationDate: "2024-06-25",
      priority: "high",
    },
    {
      id: 12,
      name: "João",
      confirmed: true,
      reason: "Confirmado via email",
      email: "joao@email.com",
      phone: "(11) 99999-0012",
      age: 14,
      registrationDate: "2024-06-26",
      priority: "medium",
    },
    {
      id: 13,
      name: "Anna Lívia",
      confirmed: true,
      reason: "Confirmado via telefone",
      email: "anna.livia@email.com",
      phone: "(11) 99999-0013",
      age: 15,
      registrationDate: "2024-06-27",
      priority: "high",
    },
    {
      id: 14,
      name: "Daniel dos Anjos",
      confirmed: false,
      reason: "Problemas de transporte",
      email: "daniel.anjos@email.com",
      phone: "(11) 99999-0014",
      age: 16,
      registrationDate: "2024-06-28",
      priority: "low",
    },
    {
      id: 15,
      name: "João Patrão",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "joao.patrao@email.com",
      phone: "(11) 99999-0015",
      age: 15,
      registrationDate: "2024-06-29",
      priority: "high",
    },
    {
      id: 16,
      name: "Brian Patrão",
      confirmed: true,
      reason: "Confirmado via WhatsApp",
      email: "brian.patrao@email.com",
      phone: "(11) 99999-0016",
      age: 14,
      registrationDate: "2024-06-30",
      priority: "medium",
    },
    {
      id: 17,
      name: "Erick",
      confirmed: false,
      reason: "Aguardando confirmação",
      email: "erick@email.com",
      phone: "(11) 99999-0017",
      age: 15,
      registrationDate: "2024-07-01",
      priority: "medium",
    },
    {
      id: 18,
      name: "Miguel Moraes",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "miguel.moraes@email.com",
      phone: "(11) 99999-0018",
      age: 16,
      registrationDate: "2024-07-02",
      priority: "high",
    },
    {
      id: 19,
      name: "Livia",
      confirmed: true,
      reason: "Confirmado via email",
      email: "livia@email.com",
      phone: "(11) 99999-0019",
      age: 14,
      registrationDate: "2024-07-03",
      priority: "medium",
    },
    {
      id: 20,
      name: "Manuela Andrade",
      confirmed: true,
      reason: "Confirmado via telefone",
      email: "manuela.andrade@email.com",
      phone: "(11) 99999-0020",
      age: 15,
      registrationDate: "2024-07-04",
      priority: "high",
    },
    {
      id: 21,
      name: "Nicolas Genelhu",
      confirmed: false,
      reason: "Questões familiares",
      email: "nicolas.genelhu@email.com",
      phone: "(11) 99999-0021",
      age: 16,
      registrationDate: "2024-07-05",
      priority: "low",
    },
    {
      id: 22,
      name: "Emanuelle Torres",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "emanuelle.torres@email.com",
      phone: "(11) 99999-0022",
      age: 15,
      registrationDate: "2024-07-06",
      priority: "medium",
    },
    {
      id: 23,
      name: "Pedro Lucca",
      confirmed: true,
      reason: "Confirmado via WhatsApp",
      email: "pedro.lucca@email.com",
      phone: "(11) 99999-0023",
      age: 14,
      registrationDate: "2024-07-07",
      priority: "high",
    },
    {
      id: 24,
      name: "Henrique",
      confirmed: true,
      reason: "Confirmado via email",
      email: "henrique@email.com",
      phone: "(11) 99999-0024",
      age: 15,
      registrationDate: "2024-07-08",
      priority: "medium",
    },
    {
      id: 25,
      name: "Eduarda Alves",
      confirmed: false,
      reason: "Aguardando decisão",
      email: "eduarda.alves@email.com",
      phone: "(11) 99999-0025",
      age: 16,
      registrationDate: "2024-07-09",
      priority: "medium",
    },
    {
      id: 26,
      name: "Arthur Gabriel",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "arthur.gabriel@email.com",
      phone: "(11) 99999-0026",
      age: 15,
      registrationDate: "2024-07-10",
      priority: "high",
    },
    {
      id: 27,
      name: "Manuela",
      confirmed: true,
      reason: "Confirmado via telefone",
      email: "manuela@email.com",
      phone: "(11) 99999-0027",
      age: 14,
      registrationDate: "2024-07-11",
      priority: "medium",
    },
    {
      id: 28,
      name: "João Mário",
      confirmed: true,
      reason: "Confirmado via WhatsApp",
      email: "joao.mario@email.com",
      phone: "(11) 99999-0028",
      age: 15,
      registrationDate: "2024-07-12",
      priority: "high",
    },
    {
      id: 29,
      name: "King",
      confirmed: false,
      reason: "Problemas de agenda",
      email: "king@email.com",
      phone: "(11) 99999-0029",
      age: 16,
      registrationDate: "2024-07-13",
      priority: "low",
    },
    {
      id: 30,
      name: "Sofia",
      confirmed: true,
      reason: "Pagamento realizado",
      email: "sofia@email.com",
      phone: "(11) 99999-0030",
      age: 15,
      registrationDate: "2024-07-14",
      priority: "medium",
    },
    {
      id: 31,
      name: "Vitor",
      confirmed: true,
      reason: "Confirmado via email",
      email: "vitor@email.com",
      phone: "(11) 99999-0031",
      age: 14,
      registrationDate: "2024-07-15",
      priority: "high",
    },
    {
      id: 32,
      name: "Francesco",
      confirmed: true,
      reason: "Confirmado via telefone",
      email: "francesco@email.com",
      phone: "(11) 99999-0032",
      age: 15,
      registrationDate: "2024-07-16",
      priority: "medium",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "pending">("all")
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "low">("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    priority: "medium" as const,
    notes: "",
  })

  const filteredAndSortedParticipants = useMemo(() => {
    const filtered = participants.filter((participant) => {
      const matchesSearch =
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.reason.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "confirmed" && participant.confirmed) ||
        (statusFilter === "pending" && !participant.confirmed)

      const matchesPriority = priorityFilter === "all" || participant.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })

    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "confirmed") {
        aValue = a.confirmed ? 1 : 0
        bValue = b.confirmed ? 1 : 0
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [participants, searchTerm, statusFilter, priorityFilter, sortField, sortOrder])

  const stats = useMemo(() => {
    const total = participants.length
    const confirmed = participants.filter((p) => p.confirmed).length
    const pending = total - confirmed
    const highPriority = participants.filter((p) => p.priority === "high").length
    const confirmationRate = total > 0 ? Math.round((confirmed / total) * 100) : 0

    return { total, confirmed, pending, highPriority, confirmationRate }
  }, [participants])

  const toggleConfirmation = (id: number) => {
    setParticipants((prev) =>
      prev.map((participant) =>
        participant.id === id ? { ...participant, confirmed: !participant.confirmed } : participant,
      ),
    )
    toast({
      title: "Status atualizado",
      description: "O status de confirmação foi alterado com sucesso.",
    })
  }

  const removeParticipant = (id: number) => {
    setParticipants((prev) => prev.filter((participant) => participant.id !== id))
    setSelectedParticipants((prev) => prev.filter((selectedId) => selectedId !== id))
    toast({
      title: "Participante removido",
      description: "O participante foi removido da lista com sucesso.",
      variant: "destructive",
    })
  }

  const addParticipant = () => {
    if (!newParticipant.name.trim()) return

    const participant: Participant = {
      id: Math.max(...participants.map((p) => p.id)) + 1,
      name: newParticipant.name,
      email: newParticipant.email,
      phone: newParticipant.phone,
      age: newParticipant.age ? Number.parseInt(newParticipant.age) : undefined,
      confirmed: false,
      reason: "Aguardando confirmação",
      registrationDate: new Date().toISOString().split("T")[0],
      priority: newParticipant.priority,
      notes: newParticipant.notes,
    }

    setParticipants((prev) => [...prev, participant])
    setNewParticipant({ name: "", email: "", phone: "", age: "", priority: "medium", notes: "" })

    toast({
      title: "Participante adicionado",
      description: `${participant.name} foi adicionado à lista com sucesso.`,
    })
  }

  const bulkConfirm = () => {
    setParticipants((prev) => prev.map((p) => (selectedParticipants.includes(p.id) ? { ...p, confirmed: true } : p)))
    setSelectedParticipants([])
    toast({
      title: "Confirmação em massa",
      description: `${selectedParticipants.length} participantes foram confirmados.`,
    })
  }

  const bulkRemove = () => {
    setParticipants((prev) => prev.filter((p) => !selectedParticipants.includes(p.id)))
    setSelectedParticipants([])
    toast({
      title: "Remoção em massa",
      description: "Os participantes selecionados foram removidos.",
      variant: "destructive",
    })
  }

  const exportData = () => {
    setIsLoading(true)
    setTimeout(() => {
      const csvContent = [
        ["Nome", "Email", "Telefone", "Idade", "Status", "Prioridade", "Data de Registro", "Motivo"],
        ...participants.map((p) => [
          p.name,
          p.email || "",
          p.phone || "",
          p.age || "",
          p.confirmed ? "Confirmado" : "Pendente",
          p.priority,
          p.registrationDate,
          p.reason,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "rocket-camp-participants.csv"
      a.click()

      setIsLoading(false)
      toast({
        title: "Exportação concluída",
        description: "Os dados foram exportados com sucesso.",
      })
    }, 2000)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-orange-500"
      case "medium":
        return "from-yellow-500 to-amber-500"
      case "low":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Flame className="h-3 w-3" />
      case "medium":
        return <Zap className="h-3 w-3" />
      case "low":
        return <Star className="h-3 w-3" />
      default:
        return null
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Simular atualizações em tempo real
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <TooltipProvider>
      <div
        className={`min-h-screen transition-all duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
            : "bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50"
        } p-4 md:p-8`}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6"
          >
            <motion.div
              className="flex justify-center mb-6"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <Image
                  src="/rocket-camp-logo.png"
                  alt="Rocket Camp 25 Logo"
                  width={350}
                  height={230}
                  className="rounded-xl shadow-2xl"
                />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              Sistema de Gestão
            </motion.h1>

            <motion.p
              className={`text-xl font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Rocket Summer Camp 25 • 01 e 02 de Agosto
            </motion.p>

            {/* Dark Mode Toggle */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button variant="outline" size="sm" onClick={() => setIsDarkMode(!isDarkMode)} className="gap-2">
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDarkMode ? "Modo Claro" : "Modo Escuro"}
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className={`border-0 shadow-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gradient-to-br from-orange-100 to-orange-50"} backdrop-blur-sm`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-orange-300" : "text-orange-800"}`}>
                    Total de Inscritos
                  </CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  >
                    <Users className={`h-5 w-5 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className={`text-3xl font-bold ${isDarkMode ? "text-orange-200" : "text-orange-900"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  >
                    {stats.total}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className={`border-0 shadow-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gradient-to-br from-green-100 to-green-50"} backdrop-blur-sm`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-green-300" : "text-green-800"}`}>
                    Confirmados
                  </CardTitle>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <CheckCircle className={`h-5 w-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className={`text-3xl font-bold ${isDarkMode ? "text-green-200" : "text-green-900"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  >
                    {stats.confirmed}
                  </motion.div>
                  <Progress value={stats.confirmationRate} className="mt-2" />
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-green-300" : "text-green-700"}`}>
                    {stats.confirmationRate}% confirmados
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className={`border-0 shadow-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gradient-to-br from-red-100 to-red-50"} backdrop-blur-sm`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-red-300" : "text-red-800"}`}>
                    Pendentes
                  </CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <XCircle className={`h-5 w-5 ${isDarkMode ? "text-red-400" : "text-red-600"}`} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className={`text-3xl font-bold ${isDarkMode ? "text-red-200" : "text-red-900"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                  >
                    {stats.pending}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className={`border-0 shadow-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gradient-to-br from-purple-100 to-purple-50"} backdrop-blur-sm`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-purple-300" : "text-purple-800"}`}>
                    Alta Prioridade
                  </CardTitle>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Flame className={`h-5 w-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className={`text-3xl font-bold ${isDarkMode ? "text-purple-200" : "text-purple-900"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                  >
                    {stats.highPriority}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card
                className={`border-0 shadow-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gradient-to-br from-blue-100 to-blue-50"} backdrop-blur-sm`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${isDarkMode ? "text-blue-300" : "text-blue-800"}`}>
                    Taxa de Sucesso
                  </CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <BarChart3 className={`h-5 w-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className={`text-3xl font-bold ${isDarkMode ? "text-blue-200" : "text-blue-900"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
                  >
                    {stats.confirmationRate}%
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Enhanced Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Tabs defaultValue="list" className="space-y-6">
              <TabsList className={`grid w-full grid-cols-3 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <TabsTrigger value="list" className="gap-2">
                  <Users className="h-4 w-4" />
                  Lista de Participantes
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-6">
                {/* Advanced Filters and Controls */}
                <Card
                  className={`shadow-xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/80"} backdrop-blur-sm`}
                >
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      <Filter className="h-5 w-5" />
                      Controles Avançados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="search">Buscar</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="search"
                            placeholder="Nome, email ou motivo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="confirmed">Confirmados</SelectItem>
                            <SelectItem value="pending">Pendentes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Prioridade</Label>
                        <Select value={priorityFilter} onValueChange={(value: any) => setPriorityFilter(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="low">Baixa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Ações</Label>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={exportData}
                                disabled={isLoading}
                                className="gap-2 bg-transparent"
                              >
                                {isLoading ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Download className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Exportar dados</TooltipContent>
                          </Tooltip>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Adicionar participante</TooltipContent>
                              </Tooltip>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Adicionar Participante</DialogTitle>
                                <DialogDescription>Preencha os dados do novo participante.</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="name">Nome *</Label>
                                  <Input
                                    id="name"
                                    value={newParticipant.name}
                                    onChange={(e) => setNewParticipant((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Nome completo"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={newParticipant.email}
                                    onChange={(e) => setNewParticipant((prev) => ({ ...prev, email: e.target.value }))}
                                    placeholder="email@exemplo.com"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="phone">Telefone</Label>
                                  <Input
                                    id="phone"
                                    value={newParticipant.phone}
                                    onChange={(e) => setNewParticipant((prev) => ({ ...prev, phone: e.target.value }))}
                                    placeholder="(11) 99999-9999"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="age">Idade</Label>
                                    <Input
                                      id="age"
                                      type="number"
                                      value={newParticipant.age}
                                      onChange={(e) => setNewParticipant((prev) => ({ ...prev, age: e.target.value }))}
                                      placeholder="15"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="priority">Prioridade</Label>
                                    <Select
                                      value={newParticipant.priority}
                                      onValueChange={(value: any) =>
                                        setNewParticipant((prev) => ({ ...prev, priority: value }))
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="high">Alta</SelectItem>
                                        <SelectItem value="medium">Média</SelectItem>
                                        <SelectItem value="low">Baixa</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="notes">Observações</Label>
                                  <Textarea
                                    id="notes"
                                    value={newParticipant.notes}
                                    onChange={(e) => setNewParticipant((prev) => ({ ...prev, notes: e.target.value }))}
                                    placeholder="Observações adicionais..."
                                    rows={3}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={addParticipant} disabled={!newParticipant.name.trim()}>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Adicionar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>

                    {/* Bulk Actions */}
                    <AnimatePresence>
                      {selectedParticipants.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                        >
                          <span className="text-sm font-medium">
                            {selectedParticipants.length} participante(s) selecionado(s)
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={bulkConfirm} className="gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Confirmar Todos
                            </Button>
                            <Button size="sm" variant="destructive" onClick={bulkRemove} className="gap-2">
                              <Trash2 className="h-4 w-4" />
                              Remover Todos
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>

                {/* Enhanced Main Table */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Card
                    className={`shadow-2xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} backdrop-blur-sm overflow-hidden`}
                  >
                    <CardHeader className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Rocket className="h-6 w-6" />
                        </motion.div>
                        Participantes do Rocket Summer Camp 25
                        <Badge variant="secondary" className="ml-auto">
                          {filteredAndSortedParticipants.length} de {participants.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className={`${isDarkMode ? "bg-gray-700/50" : "bg-gray-50/80"}`}>
                              <TableHead className="w-12">
                                <Checkbox
                                  checked={selectedParticipants.length === filteredAndSortedParticipants.length}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedParticipants(filteredAndSortedParticipants.map((p) => p.id))
                                    } else {
                                      setSelectedParticipants([])
                                    }
                                  }}
                                />
                              </TableHead>
                              <TableHead
                                className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                onClick={() => handleSort("name")}
                              >
                                <div className="flex items-center gap-2">
                                  Nome
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead>Contato</TableHead>
                              <TableHead
                                className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                onClick={() => handleSort("confirmed")}
                              >
                                <div className="flex items-center gap-2">
                                  Status
                                  <ArrowUpDown className="h-4 w-4" />
                                </div>
                              </TableHead>
                              <TableHead>Prioridade</TableHead>
                              <TableHead>Motivo</TableHead>
                              <TableHead className="text-center">Confirmado</TableHead>
                              <TableHead className="text-center">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <AnimatePresence>
                              {filteredAndSortedParticipants.map((participant, index) => (
                                <motion.tr
                                  key={participant.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ delay: index * 0.05 }}
                                  className={`hover:bg-orange-50/50 dark:hover:bg-gray-700/50 transition-all duration-200 border-b ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                  }`}
                                >
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedParticipants.includes(participant.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedParticipants((prev) => [...prev, participant.id])
                                        } else {
                                          setSelectedParticipants((prev) => prev.filter((id) => id !== participant.id))
                                        }
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    <div className="space-y-1">
                                      <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                                        {participant.name}
                                      </div>
                                      {participant.age && (
                                        <div className="text-xs text-gray-500">{participant.age} anos</div>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="space-y-1 text-xs">
                                      {participant.email && (
                                        <div className="flex items-center gap-1">
                                          <Mail className="h-3 w-3" />
                                          <span className="truncate max-w-32">{participant.email}</span>
                                        </div>
                                      )}
                                      {participant.phone && (
                                        <div className="flex items-center gap-1">
                                          <Phone className="h-3 w-3" />
                                          <span>{participant.phone}</span>
                                        </div>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                      <Badge
                                        variant={participant.confirmed ? "default" : "secondary"}
                                        className={
                                          participant.confirmed
                                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                                            : "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg"
                                        }
                                      >
                                        {participant.confirmed ? "Confirmado" : "Pendente"}
                                      </Badge>
                                    </motion.div>
                                  </TableCell>
                                  <TableCell>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                      <Badge
                                        className={`bg-gradient-to-r ${getPriorityColor(participant.priority)} text-white shadow-lg`}
                                      >
                                        <div className="flex items-center gap-1">
                                          {getPriorityIcon(participant.priority)}
                                          {participant.priority === "high"
                                            ? "Alta"
                                            : participant.priority === "medium"
                                              ? "Média"
                                              : "Baixa"}
                                        </div>
                                      </Badge>
                                    </motion.div>
                                  </TableCell>
                                  <TableCell className="max-w-xs">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="truncate text-sm text-gray-600 dark:text-gray-300">
                                          {participant.reason}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">{participant.reason}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                      <Switch
                                        checked={participant.confirmed}
                                        onCheckedChange={() => toggleConfirmation(participant.id)}
                                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-red-500"
                                      />
                                    </motion.div>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Ver detalhes</TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Editar</TooltipContent>
                                      </Tooltip>

                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Remover</TooltipContent>
                                          </Tooltip>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Remover Participante</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Tem certeza que deseja remover <strong>{participant.name}</strong> da
                                              lista? Esta ação não pode ser desfeita.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => removeParticipant(participant.id)}
                                              className="bg-red-600 hover:bg-red-700"
                                            >
                                              Remover
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </TableCell>
                                </motion.tr>
                              ))}
                            </AnimatePresence>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card
                  className={`shadow-xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} backdrop-blur-sm`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analytics Avançados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Distribuição por Prioridade</h3>
                        <div className="space-y-2">
                          {["high", "medium", "low"].map((priority) => {
                            const count = participants.filter((p) => p.priority === priority).length
                            const percentage = participants.length > 0 ? (count / participants.length) * 100 : 0
                            return (
                              <div key={priority} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="capitalize">
                                    {priority === "high" ? "Alta" : priority === "medium" ? "Média" : "Baixa"}
                                  </span>
                                  <span>
                                    {count} ({percentage.toFixed(1)}%)
                                  </span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Registros por Período</h3>
                        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500">Gráfico de registros em desenvolvimento</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card
                  className={`shadow-xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} backdrop-blur-sm`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Configurações do Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Modo Escuro</Label>
                          <p className="text-sm text-gray-500">Alternar entre tema claro e escuro</p>
                        </div>
                        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label className="text-base font-medium">Notificações</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Novos registros</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Confirmações</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Lembretes</Label>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label className="text-base font-medium">Exportação</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <FileText className="h-4 w-4" />
                            Backup Completo
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Download className="h-4 w-4" />
                            Relatório PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Animated Footer */}
          <motion.div
            className="text-center text-gray-500 text-sm space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Rocket className="h-4 w-4 text-orange-500" />
              </motion.div>
              <p>Rocket Summer Camp 25 • Sistema de Gerenciamento Avançado</p>
            </div>
            <p className="text-xs">Desenvolvido com ❤️ para uma experiência incrível</p>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  )
}
