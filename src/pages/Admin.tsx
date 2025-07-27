import React, { useState } from 'react';
import { useAuth } from '@/auth/useAuth';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAffiliatePrograms } from '@/hooks/useAffiliatePrograms';
import AffiliateFilters from '@/components/affiliate/AffiliateFilters';
import AffiliateList from '@/components/affiliate/AffiliateList';
import AddProgramModal from '@/components/affiliate/AddProgramModal';
import EditProgramModal from '@/components/affiliate/EditProgramModal';
import CSVImportModal from '@/components/affiliate/CSVImportModal';
import APIImportModal from '@/components/affiliate/APIImportModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Loader2, Upload, Download, Globe, Shield } from 'lucide-react';

const ADMIN_EMAIL = 'admin@affi-liberty.com'; // L'email admin autorisé

const AdminLogin = ({ onLogin }: { onLogin: (password: string) => void }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Administration Affi-Liberty</CardTitle>
            <CardDescription>
              Accès réservé à l'administrateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe administrateur</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCSVImportModal, setShowCSVImportModal] = useState(false);
  const [showAPIImportModal, setShowAPIImportModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  
  const { user } = useAuth();
  const { programs, categories, loading, addProgram, updateProgram, deleteProgram } = useAffiliatePrograms();
  
  // Filter programs based on search, category and recurring filter
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ? true : program.category === selectedCategory;
    const matchesRecurring = showRecurringOnly ? program.recurring : true;
    
    return matchesSearch && matchesCategory && matchesRecurring;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setShowRecurringOnly(false);
  };

  // Determine if filters are active
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || showRecurringOnly;

  const handleAddProgram = async (programData: any) => {
    await addProgram({
      ...programData,
      created_by: user?.id,
    });
  };

  const handleEditProgram = async (id: string, programData: any) => {
    await updateProgram(id, programData);
    setShowEditModal(false);
    setSelectedProgram(null);
  };

  const handleDeleteProgram = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      await deleteProgram(id);
    }
  };

  const handleEdit = (program: any) => {
    setSelectedProgram(program);
    setShowEditModal(true);
  };

  const handleCSVImport = async (programs: any[]) => {
    for (const program of programs) {
      await addProgram({
        ...program,
        created_by: user?.id,
      });
    }
  };

  const handleAPIImport = async (programs: any[]) => {
    for (const program of programs) {
      await addProgram({
        ...program,
        created_by: user?.id,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Administration - Programmes d'Affiliation
              </h1>
              <p className="text-muted-foreground mt-2">
                Interface d'administration pour gérer les programmes d'affiliation
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un programme
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Importer
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setShowCSVImportModal(true)}>
                    <Download className="mr-2 h-4 w-4" />
                    Importer CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowAPIImportModal(true)}>
                    <Globe className="mr-2 h-4 w-4" />
                    Importer via API
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <AffiliateFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          showRecurringOnly={showRecurringOnly}
          setShowRecurringOnly={setShowRecurringOnly}
          categories={categories}
          totalCount={programs.length}
          filteredCount={filteredPrograms.length}
          resetFilters={resetFilters}
          showResetButton={hasActiveFilters && filteredPrograms.length > 0}
        />

        <AffiliateList 
          programs={filteredPrograms}
          resetFilters={resetFilters}
          onEdit={handleEdit}
          onDelete={handleDeleteProgram}
        />

        <AddProgramModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onSubmit={handleAddProgram}
          categories={categories}
        />

        <EditProgramModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          onSubmit={handleEditProgram}
          program={selectedProgram}
          categories={categories}
        />

        <CSVImportModal
          open={showCSVImportModal}
          onOpenChange={setShowCSVImportModal}
          onImport={handleCSVImport}
        />

        <APIImportModal
          open={showAPIImportModal}
          onOpenChange={setShowAPIImportModal}
          onImport={handleAPIImport}
        />
      </div>
    </Layout>
  );
};

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [error, setError] = useState('');

  // Vérifier si l'utilisateur est connecté et autorisé
  if (!isAuthenticated || user?.email !== ADMIN_EMAIL) {
    return <Navigate to="/login" replace />;
  }

  const handleAdminLogin = (password: string) => {
    // Mot de passe simple pour l'admin (en production, utiliser un hash)
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (!isAdminLoggedIn) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  return <AdminDashboard />;
};

export default Admin;