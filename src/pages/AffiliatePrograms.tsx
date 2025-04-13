
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from "@/integrations/supabase/client";
import { AffiliateProgram, categories } from '@/data/affiliatePrograms';
import AffiliateFilters from '@/components/affiliate/AffiliateFilters';
import AffiliateList from '@/components/affiliate/AffiliateList';
import { toast } from "@/hooks/use-toast";

const AffiliatePrograms = () => {
  const [affiliatePrograms, setAffiliatePrograms] = useState<AffiliateProgram[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);
  
  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from('affiliate_tables')
        .select('*');
      
      if (error) {
        toast({
          title: "Erreur de chargement",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setAffiliatePrograms(data as AffiliateProgram[] || []);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = affiliatePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ? true : program.category === selectedCategory;
    const matchesRecurring = showRecurringOnly ? program.recurring : true;
    
    return matchesSearch && matchesCategory && matchesRecurring;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setShowRecurringOnly(false);
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || showRecurringOnly;

  return (
    <Layout>
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Programmes d'Affiliation</h1>
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
            totalCount={affiliatePrograms.length}
            filteredCount={filteredPrograms.length}
            resetFilters={resetFilters}
            showResetButton={hasActiveFilters && filteredPrograms.length > 0}
          />

          <AffiliateList 
            programs={filteredPrograms}
            resetFilters={resetFilters}
          />
        </div>
      </section>
    </Layout>
  );
};

export default AffiliatePrograms;
