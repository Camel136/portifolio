import { useEffect, useState } from 'react';

export default function useInstruction(insideOfTent) {
  const instructions = [
    'Use o mouse para olhar ao redor da cena até que o acesso esteja visível.',
    'Bem-vindo ao meu portfólio.',
    'Para ver o conteúdo desejado, aponte a mira para o alvo e mantenha-a fixa por 2 segundos. O conteúdo será aberto automaticamente em uma janela',
  ];

  const [instruction, setInstruction] = useState(instructions[0]);

  useEffect(() => {
    if (!insideOfTent) {
      setInstruction(instructions[0]);
      return;
    }

    setInstruction(instructions[1]);

    const timer = setTimeout(() => {
      setInstruction(instructions[2]);
    }, 4000);

    return () => clearTimeout(timer);
  }, [insideOfTent]);

  return instruction;
}
