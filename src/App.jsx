import Navbar from './components/Navbar';
import PromptForm from "./components/PromptForm";
import { useState } from "react";
import ResultCard from './components/ResultCard';

export default function App(){
  const [result, setResult] = useState(null);
  return(
    <div>
      <Navbar />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '32px' }}>
        <PromptForm setResult={setResult} />
        <ResultCard result={result} />
      </main>
    </div>
  );
}