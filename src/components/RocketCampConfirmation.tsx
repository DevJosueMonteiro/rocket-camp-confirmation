"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Separator } from "./ui/separator"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
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
} from "./ui/alert-dialog"

import { toast } from "../hooks/use-toast"
import {
  Trash2,
  Rocket,
  Users,
  CheckCircle,
  XCircle,
  Search,
  Download,
  Plus,
  Moon,
  Sun,
  ArrowUpDown,
  Edit,
  Eye,
  UserPlus,
  FileText,
  Settings,
} from "lucide-react"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"

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

export default function RocketCampConfirmation() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "Miguel", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 2, name: "Maria Clara", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 3, name: "Cláudio", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 4, name: "Enzo", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 5, name: "Mariana", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 6, name: "Ana Vitória", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 7, name: "Lucas Daniel", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 8, name: "Beatriz", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 9, name: "Alice", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 10, name: "Nathan", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 11, name: "Gabriel João", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 12, name: "Anna Lívia", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 13, name: "Daniel dos Anjos", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 14, name: "João Patrão", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 15, name: "Brian Patrão", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 16, name: "Erick", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 17, name: "Miguel Moraes", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 18, name: "Livia", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 19, name: "Manuela Andrade", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 20, name: "Nicolas Genelhu", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 21, name: "Emanuelle Torres", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 22, name: "Pedro Lucca", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 23, name: "Henrique", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 24, name: "Eduarda Alves", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 25, name: "Arthur", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 26, name: "Gabriel", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 27, name: "Manuela", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 28, name: "João Mário", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 29, name: "King", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 30, name: "Sofia", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 31, name: "Vitor", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
    { id: 32, name: "Francesco", confirmed: false, reason: "", registrationDate: "2024-07-10", priority: "medium" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "confirmed" | "pending">("all")
  const [sortField, setSortField] = useState<SortField>("registrationDate")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([])
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null)

  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    notes: "",
  })

  // Apply dark mode to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.phone?.includes(searchTerm)

      const matchesStatus = filterStatus === "all" ||
        (filterStatus === "confirmed" && participant.confirmed) ||
        (filterStatus === "pending" && !participant.confirmed)

      return matchesSearch && matchesStatus
    })
  }, [participants, searchTerm, filterStatus])

  const sortedParticipants = useMemo(() => {
    return [...filteredParticipants].sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "registrationDate") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [filteredParticipants, sortField, sortOrder])

  const confirmedCount = participants.filter((p) => p.confirmed).length
  const pendingCount = participants.filter((p) => !p.confirmed).length
  const totalCount = participants.length



  const removeParticipant = (id: number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id))
    setSelectedParticipants((prev) => prev.filter((pid) => pid !== id))
  }

  const addParticipant = () => {
    if (!newParticipant.name.trim()) return

    const participant: Participant = {
      id: Date.now(),
      name: newParticipant.name,
      confirmed: false,
      reason: "Novo registro",
      email: newParticipant.email || undefined,
      phone: newParticipant.phone || undefined,
      age: newParticipant.age ? parseInt(newParticipant.age) : undefined,
      registrationDate: new Date().toISOString().split('T')[0],
      priority: "medium", // Default priority
      notes: newParticipant.notes || undefined,
    }

    setParticipants((prev) => [...prev, participant])
    setNewParticipant({ name: "", email: "", phone: "", age: "", notes: "" })
    toast({
      title: "Participante adicionado!",
      description: `${participant.name} foi adicionado à lista.`,
    })
  }

  const bulkConfirm = () => {
    setParticipants((prev) =>
      prev.map((p) =>
        selectedParticipants.includes(p.id) ? { ...p, confirmed: true } : p
      )
    )
    setSelectedParticipants([])
    toast({
      title: "Participantes confirmados!",
      description: `${selectedParticipants.length} participantes foram confirmados.`,
    })
  }

  const bulkRemove = () => {
    setParticipants((prev) => prev.filter((p) => !selectedParticipants.includes(p.id)))
    setSelectedParticipants([])
    toast({
      title: "Participantes removidos!",
      description: `${selectedParticipants.length} participantes foram removidos.`,
    })
  }

  const exportData = () => {
    const csvContent = [
      ["Nome", "Email", "Telefone", "Idade", "Confirmado", "Prioridade", "Data de Registro", "Motivo"],
      ...participants.map((p) => [
        p.name,
        p.email || "",
        p.phone || "",
        p.age?.toString() || "",
        p.confirmed ? "Sim" : "Não",
        p.priority === "high" ? "Alta" : p.priority === "medium" ? "Média" : "Baixa",
        p.registrationDate,
        p.reason,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "rocket-camp-participants.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Dados exportados!",
      description: "Lista de participantes foi baixada como CSV.",
    })
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const toggleConfirmation = (id: number) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, confirmed: !p.confirmed } : p))
    )
    toast({
      title: "Status atualizado!",
      description: `Status de ${participants.find((p) => p.id === id)?.name} foi alterado para ${
        participants.find((p) => p.id === id)?.confirmed ? "Confirmado" : "Pendente"
      }.`,
    })
  }

  const openDetailsDialog = (participant: Participant) => {
    setSelectedParticipant(participant)
    setShowDetailsDialog(true)
  }

  const openEditDialog = (participant: Participant) => {
    setEditingParticipant(participant)
    setShowEditDialog(true)
  }

  const saveEdit = () => {
    if (!editingParticipant) return
    
    setParticipants((prev) =>
      prev.map((p) => (p.id === editingParticipant.id ? editingParticipant : p))
    )
    setShowEditDialog(false)
    setEditingParticipant(null)
    toast({
      title: "Participante atualizado!",
      description: `${editingParticipant.name} foi atualizado com sucesso.`,
    })
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Rocket className="h-8 w-8 text-orange-500" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Rocket Summer Camp 25
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Sistema de Confirmação de Participantes
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {totalCount} Total
              </span>
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                {confirmedCount} Confirmados
              </span>
              <span className="flex items-center gap-1 text-orange-600">
                <XCircle className="h-4 w-4" />
                {pendingCount} Pendentes
              </span>
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            className="flex justify-end mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="gap-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDarkMode ? "Modo Claro" : "Modo Escuro"}
            </Button>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Tabs defaultValue="participants" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="participants" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participantes
                </TabsTrigger>
                <TabsTrigger value="add" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Adicionar
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configurações
                </TabsTrigger>
              </TabsList>

              <TabsContent value="participants" className="space-y-6">
                {/* Filters and Actions */}
                <Card className={`shadow-xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} backdrop-blur-sm`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                      <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Buscar participantes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>

                        <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                          <SelectTrigger className="w-full sm:w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos os Status</SelectItem>
                            <SelectItem value="confirmed">Confirmados</SelectItem>
                            <SelectItem value="pending">Pendentes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={exportData}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Exportar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {}}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    {selectedParticipants.length > 0 && (
                      <motion.div
                        className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            {selectedParticipants.length} participante(s) selecionado(s)
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={bulkConfirm}
                              className="gap-2 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Confirmar Todos
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={bulkRemove}
                              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remover Todos
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Participants Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Card className={`shadow-xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Lista de Participantes
                        <Badge variant="secondary" className="ml-2">
                          {sortedParticipants.length} de {totalCount}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox
                                  checked={selectedParticipants.length === sortedParticipants.length && sortedParticipants.length > 0}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedParticipants(sortedParticipants.map((p) => p.id))
                                    } else {
                                      setSelectedParticipants([])
                                    }
                                  }}
                                />
                              </TableHead>
                              <TableHead>
                                <Button
                                  variant="ghost"
                                  onClick={() => handleSort("name")}
                                  className="h-auto p-0 font-semibold hover:bg-transparent"
                                >
                                  Nome
                                  <ArrowUpDown className="ml-1 h-4 w-4" />
                                </Button>
                              </TableHead>
                              <TableHead>
                                <Button
                                  variant="ghost"
                                  onClick={() => handleSort("confirmed")}
                                  className="h-auto p-0 font-semibold hover:bg-transparent"
                                >
                                  Status
                                  <ArrowUpDown className="ml-1 h-4 w-4" />
                                </Button>
                              </TableHead>
                              <TableHead>Motivo</TableHead>
                              <TableHead className="text-center">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <AnimatePresence>
                              {sortedParticipants.map((participant) => (
                                <motion.tr
                                  key={participant.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ duration: 0.2 }}
                                  className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                                    selectedParticipants.includes(participant.id)
                                      ? "bg-blue-50 dark:bg-blue-900/20"
                                      : ""
                                  }`}
                                >
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedParticipants.includes(participant.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedParticipants((prev) => [...prev, participant.id])
                                        } else {
                                          setSelectedParticipants((prev) =>
                                            prev.filter((id) => id !== participant.id)
                                          )
                                        }
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">{participant.name}</TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={participant.confirmed ? "default" : "secondary"}
                                      className={`gap-1 cursor-pointer hover:opacity-80 ${
                                        participant.confirmed
                                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                          : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                                      }`}
                                      onClick={() => toggleConfirmation(participant.id)}
                                    >
                                      {participant.confirmed ? (
                                        <CheckCircle className="h-3 w-3" />
                                      ) : (
                                        <XCircle className="h-3 w-3" />
                                      )}
                                      {participant.confirmed ? "Confirmado" : "Pendente"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="max-w-xs truncate">{participant.reason}</TableCell>
                                  <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 w-8 p-0"
                                            onClick={() => openDetailsDialog(participant)}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Ver detalhes</TooltipContent>
                                      </Tooltip>

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                                                                      <Button 
                                              variant="ghost" 
                                              size="sm" 
                                              className="h-8 w-8 p-0"
                                              onClick={() => openEditDialog(participant)}
                                            >
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

              <TabsContent value="add" className="space-y-6">
                <Card className={`shadow-xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} backdrop-blur-sm`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Adicionar Novo Participante
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nome Completo *</Label>
                          <Input
                            id="name"
                            value={newParticipant.name}
                            onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                            placeholder="Digite o nome completo"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newParticipant.email}
                            onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                            placeholder="email@exemplo.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={newParticipant.phone}
                            onChange={(e) => setNewParticipant({ ...newParticipant, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="age">Idade</Label>
                          <Input
                            id="age"
                            type="number"
                            value={newParticipant.age}
                            onChange={(e) => setNewParticipant({ ...newParticipant, age: e.target.value })}
                            placeholder="15"
                            min="1"
                            max="18"
                          />
                        </div>

                        <div>
                          <Label htmlFor="notes">Observações</Label>
                          <Textarea
                            id="notes"
                            value={newParticipant.notes}
                            onChange={(e) => setNewParticipant({ ...newParticipant, notes: e.target.value })}
                            placeholder="Informações adicionais..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setNewParticipant({ name: "", email: "", phone: "", age: "", notes: "" })
                        }}
                      >
                        Limpar
                      </Button>
                      <Button onClick={addParticipant} disabled={!newParticipant.name.trim()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Participante
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className={`shadow-xl border-0 ${isDarkMode ? "bg-gray-800/50" : "bg-white/90"} backdrop-blur-sm`}>
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

      {/* Dialog de Detalhes */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Participante</DialogTitle>
          </DialogHeader>
          {selectedParticipant && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Nome</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedParticipant.name}</p>
              </div>
              {selectedParticipant.email && (
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedParticipant.email}</p>
                </div>
              )}
              {selectedParticipant.phone && (
                <div>
                  <Label className="text-sm font-medium">Telefone</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedParticipant.phone}</p>
                </div>
              )}
              {selectedParticipant.age && (
                <div>
                  <Label className="text-sm font-medium">Idade</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedParticipant.age} anos</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Badge
                  variant={selectedParticipant.confirmed ? "default" : "secondary"}
                  className={`gap-1 ${
                    selectedParticipant.confirmed
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                  }`}
                >
                  {selectedParticipant.confirmed ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {selectedParticipant.confirmed ? "Confirmado" : "Pendente"}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Motivo</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedParticipant.reason}</p>
              </div>
              {selectedParticipant.notes && (
                <div>
                  <Label className="text-sm font-medium">Observações</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedParticipant.notes}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">Data de Registro</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedParticipant.registrationDate}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Participante</DialogTitle>
          </DialogHeader>
          {editingParticipant && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome</Label>
                <Input
                  id="edit-name"
                  value={editingParticipant.name}
                  onChange={(e) => setEditingParticipant({ ...editingParticipant, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingParticipant.email || ""}
                  onChange={(e) => setEditingParticipant({ ...editingParticipant, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  value={editingParticipant.phone || ""}
                  onChange={(e) => setEditingParticipant({ ...editingParticipant, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-age">Idade</Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={editingParticipant.age || ""}
                  onChange={(e) => setEditingParticipant({ ...editingParticipant, age: e.target.value ? parseInt(e.target.value) : undefined })}
                />
              </div>
              <div>
                <Label htmlFor="edit-reason">Motivo</Label>
                <Input
                  id="edit-reason"
                  value={editingParticipant.reason}
                  onChange={(e) => setEditingParticipant({ ...editingParticipant, reason: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-notes">Observações</Label>
                <Textarea
                  id="edit-notes"
                  value={editingParticipant.notes || ""}
                  onChange={(e) => setEditingParticipant({ ...editingParticipant, notes: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-confirmed"
                  checked={editingParticipant.confirmed}
                  onCheckedChange={(checked) => setEditingParticipant({ ...editingParticipant, confirmed: checked })}
                />
                <Label htmlFor="edit-confirmed">Confirmado</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={saveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
} 