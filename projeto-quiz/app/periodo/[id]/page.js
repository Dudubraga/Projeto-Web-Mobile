'use client';
import { useParams } from 'next/navigation';
import { Cabecalho } from '@/components/cabecalho';

export default function PeriodoPage() {
    const { id } = useParams();

    return (
        <>
        <Cabecalho />
        <div className='box-container'>
        <div className='home-container'>

            <h1>Quiz do {id.replace('-', ' ')}</h1>
            {/* Aqui você pode puxar as perguntas do banco usando o ID */}
            </div>
        </div>
        </>
    );
}
