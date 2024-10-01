import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AuditedProducts } from './audited-products'
import { TaxationAnalysist } from './taxation-analysist'

export default async function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <Tabs defaultValue="audited-products">
        <TabsList>
          <TabsTrigger value="audited-products">Produtos auditados</TabsTrigger>
          <TabsTrigger value="taxation-analysis">
            Análise de Tributação
          </TabsTrigger>
        </TabsList>
        <TabsContent value="audited-products" className="mt-4">
          <AuditedProducts />
        </TabsContent>
        <TabsContent value="taxation-analysis" className="mt-4">
          <TaxationAnalysist />
        </TabsContent>
      </Tabs>
    </div>
  )
}
