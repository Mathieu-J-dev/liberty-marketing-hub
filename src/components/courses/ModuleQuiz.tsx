import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Module {
  id: number;
  title: string;
  quiz: QuizQuestion[];
}

interface ModuleQuizProps {
  module: Module;
  onComplete: (passed: boolean) => void;
  result?: boolean;
}

const ModuleQuiz: React.FC<ModuleQuizProps> = ({ module, onComplete, result }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < module.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    setQuizCompleted(true);
    
    const correctAnswers = module.quiz.filter((question, index) => 
      answers[index] === question.correctAnswer
    ).length;
    
    const score = (correctAnswers / module.quiz.length) * 100;
    const passed = score >= 70; // 70% minimum pour valider
    
    onComplete(passed);
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const getScore = () => {
    const correctAnswers = module.quiz.filter((question, index) => 
      answers[index] === question.correctAnswer
    ).length;
    return (correctAnswers / module.quiz.length) * 100;
  };

  const allQuestionsAnswered = Object.keys(answers).length === module.quiz.length;
  const score = getScore();
  const passed = score >= 70;

  if (showResults) {
    return (
      <div className="space-y-6">
        <Card className={`border-2 ${passed ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {passed ? '🎉 Félicitations !' : '😅 Pas tout à fait...'}
              </CardTitle>
              <Badge variant={passed ? 'default' : 'destructive'}>
                {score.toFixed(0)}% ({module.quiz.filter((q, i) => answers[i] === q.correctAnswer).length}/{module.quiz.length})
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className={`mb-4 ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed 
                ? `Excellent ! Vous avez obtenu ${score.toFixed(0)}% et validé ce module.`
                : `Vous avez obtenu ${score.toFixed(0)}%. Il faut au moins 70% pour valider le module.`
              }
            </p>
            
            {!passed && (
              <Button onClick={handleRetakeQuiz} className="mb-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refaire le QCM
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Correction détaillée */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Correction détaillée</h3>
          {module.quiz.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <Card key={index} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">
                      Question {index + 1}: {question.question}
                    </CardTitle>
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => {
                      let bgColor = '';
                      if (optionIndex === question.correctAnswer) {
                        bgColor = 'bg-green-100 text-green-800';
                      } else if (optionIndex === userAnswer && !isCorrect) {
                        bgColor = 'bg-red-100 text-red-800';
                      }
                      
                      return (
                        <div key={optionIndex} className={`p-2 rounded ${bgColor}`}>
                          {optionIndex === question.correctAnswer ? '✅' : 
                           optionIndex === userAnswer && !isCorrect ? '❌' : '⚪'} {option}
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Explication :</strong> {question.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête du quiz */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              🧠 QCM - Module {module.id}
            </CardTitle>
            <Badge variant="outline">
              Question {currentQuestion + 1} / {module.quiz.length}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Testez vos connaissances sur "{module.title}". Il faut 70% minimum pour valider le module.
          </p>
        </CardHeader>
      </Card>

      {/* Question actuelle */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1}: {module.quiz[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={answers[currentQuestion]?.toString() || ""} 
            onValueChange={(value) => handleAnswerSelect(currentQuestion, parseInt(value))}
          >
            {module.quiz[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded hover:bg-muted">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Question précédente
        </Button>
        
        <div className="text-sm text-muted-foreground">
          {Object.keys(answers).length} / {module.quiz.length} réponses
        </div>
        
        {currentQuestion < module.quiz.length - 1 ? (
          <Button 
            onClick={handleNextQuestion}
            disabled={answers[currentQuestion] === undefined}
          >
            Question suivante
          </Button>
        ) : (
          <Button 
            onClick={handleSubmitQuiz}
            disabled={!allQuestionsAnswered}
            className="bg-liberty-blue hover:bg-liberty-blue/90"
          >
            Terminer le QCM
          </Button>
        )}
      </div>

      {/* Indicateur de progression */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-liberty-blue h-2 rounded-full transition-all duration-300" 
          style={{ width: `${((currentQuestion + 1) / module.quiz.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ModuleQuiz;