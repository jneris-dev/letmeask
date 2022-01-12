import { useNavigate, useParams } from 'react-router-dom'
import { ref, remove, update } from 'firebase/database'

import { useRoom } from '../hooks/useRoom'
import { database } from '../service/firebase'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import '../styles/room.scss'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const navigate = useNavigate();
    const params = useParams<RoomParams>();
    const roomId = params.id || '';

    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        await update(ref(database, `rooms/${roomId}`), {
            endedAt: new Date(),
        })

        navigate("/");
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir está pergunta?')) {
            await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button
                            isOutlined
                            onClick={() => handleEndRoom()}
                        >
                            Encerrar sala
                        </Button>
                    </div>

                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.slice(0).reverse().map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}