import { useEffect, useState } from 'react';

export default function useInstruction(insideOfTent) {
  const instructions = [
    'Use o mouse para olhar ao redor da cena até que o acesso esteja visível.',
    'Bem-vindo ao meu portfólio.',
    'Use o sistema de mira para localizar o que você deseja ler. É só manter a mira parada sobre o objeto.',
    'Use a tecla ESC para sair do modo de controle do mouse.',
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
