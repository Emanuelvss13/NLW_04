import copy from '../images/copy.svg'
import '../styles/RoomCode.scss'

type RoomCodeProps={
    code: string
}

export default function RoomCode(props: RoomCodeProps) {
    function copyRoomCode(){
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyRoomCode} >
            <div>
                <img src={copy} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}
