
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAffiliatePrograms } from '@/hooks/useAffiliatePrograms';
import { useAuth } from '@/auth';
import AffiliateFilters from '@/components/affiliate/AffiliateFilters';
import AffiliateList from '@/components/affiliate/AffiliateList';
import AddProgramModal from '@/components/affiliate/AddProgramModal';
import EditProgramModal from '@/components/affiliate/EditProgramModal';
import CSVImportModal from '@/components/affiliate/CSVImportModal';
import APIImportModal from '@/components/affiliate/APIImportModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Loader2, Upload, Download, Globe } from 'lucide-react';

const AffiliatePrograms = () => {
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
      <div id="top"></div>
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold">Programmes d'Affiliation</h1>
              {user && (
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
              )}
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de programmes d'affiliation de haute qualité avec des commissions attractives.
            </p>
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
      </section>
    </Layout>
  );
};

export default AffiliatePrograms;
