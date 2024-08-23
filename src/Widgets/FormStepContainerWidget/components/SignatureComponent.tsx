
import React from "react";
import { isEmpty } from "../utils/lodashPolyfills";

interface SignatureProps {
	id: string,
	onChange: (dataUrl: string) => void,
	deleteButtonText: string
}

interface Point {
	x: number,
	y: number
}

interface DrawingState {
	clickX: number[],
	clickY: number[],
	clickDrag: boolean[],
}

type SignatureDrawEvent = React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>;
//TODO: Add to widget properties + delete button text
const STROKE_THICKNESS = 2;
const STROKE_COLOR = 'black';
const BACKGROUND_COLOR = '#ffffff';

export const Signature: React.FC<SignatureProps> = ({ id, onChange, deleteButtonText }) => {
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
	const [drawingState, setDrawingState] = React.useState<DrawingState>({
		clickX: [],
		clickY: [],
		clickDrag: []
	});
	const [isDrawing, setIsDrawing] = React.useState(false);

	React.useEffect(() => {
		const element = canvasRef.current;
		if (element) addCanvasListeners(element);
		return () => {
			if (element) removeCanvasListeners(element);
		};
	}, []);

	React.useEffect(() => {
		if (!isDrawing && canvasRef.current) {
			if (!isEmpty(drawingState.clickDrag)) {
				const data = canvasRef.current.toDataURL();
				onChange(data);
			}
		}
	}, [isDrawing, drawingState.clickDrag.length]);

	function handleDrawStart(e: SignatureDrawEvent): void {
		setIsDrawing(true);
		addClick(getPointerPos(e, canvasRef), false);
		draw();
	}

	function handleDrawEnd(): void {
		setIsDrawing(false);
	}

	function draw() {
		if (!canvasRef.current) return;

		const context = canvasRef.current.getContext('2d');
		if (!context) return;

		context.canvas.width = canvasRef.current.getBoundingClientRect().width;
		context.canvas.height = canvasRef.current.getBoundingClientRect().height;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.lineJoin = "round";
		context.beginPath();
		context.lineWidth = STROKE_THICKNESS;
		context.strokeStyle = STROKE_COLOR;
		context.fillStyle = BACKGROUND_COLOR;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		drawStrokes(context);
	}

	function drawStrokes(context: CanvasRenderingContext2D): void {
		for (let i = 0; i < drawingState.clickX.length; i++) {
			context.beginPath();
			if (drawingState.clickDrag[i] && i) {
				context.moveTo(drawingState.clickX[i - 1], drawingState.clickY[i - 1]);
			} else {
				context.moveTo(drawingState.clickX[i] - 1, drawingState.clickY[i]);
			}
			context.lineTo(drawingState.clickX[i], drawingState.clickY[i]);
			context.closePath();
			context.stroke();
		}
	}

	function handleDrawMove(e: SignatureDrawEvent, isDrawing: boolean): void {
		if (!isDrawing) return;

		addClick(getPointerPos(e, canvasRef), true);
		draw();
	}

	function addClick(point: Point | null, isDragging: boolean): void {
		if (!point) return;

		setDrawingState(prevState => ({
			...prevState,
			clickX: [...prevState.clickX, point.x],
			clickY: [...prevState.clickY, point.y],
			clickDrag: [...prevState.clickDrag, isDragging]
		}));
	}

	function deleteSignature(e: React.SyntheticEvent) {
		e.preventDefault();
		e.stopPropagation();
		setDrawingState({
			clickX: [],
			clickY: [],
			clickDrag: []
		});
		if (canvasRef.current) {
			const context = canvasRef.current.getContext('2d');
			if (context) {
				context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			}
		}
		onChange("");
	}

	const renderCanvas = (): JSX.Element => {
		return (
			<canvas
				ref={canvasRef}
				className="neoletter-form-canvas"
				onMouseDown={(e) => handleDrawStart(e)}
				onMouseMove={(e) => handleDrawMove(e, isDrawing)}
				onMouseUp={handleDrawEnd}
				onMouseOut={handleDrawEnd}
				onTouchStart={(e) => handleDrawStart(e)}
				onTouchMove={(e) => handleDrawMove(e, isDrawing)}
				onTouchEnd={handleDrawEnd}
				onTouchCancel={handleDrawEnd}
			></canvas>
		);
	}

	const deleteButton = (): JSX.Element => {
		return (
			<button className="delete btn btn-primary" onClick={deleteSignature}>
				<span className="delete-text">{deleteButtonText}</span>
			</button>
		);
	}

	return (
		<div id={id} className="signature">
			{renderCanvas()}
			{deleteButton()}
		</div>
	);
}

function getPointerPos(e: SignatureDrawEvent, canvasRef: React.RefObject<HTMLCanvasElement>): Point | null {
	const rect = canvasRef.current?.getBoundingClientRect();
	if (!rect) return null;
	const nativeEvent = e.nativeEvent;
	if (nativeEvent instanceof MouseEvent) {
		return {
			x: nativeEvent.clientX - rect.left,
			y: nativeEvent.clientY - rect.top
		};
	} else if (nativeEvent instanceof TouchEvent) {
		const touch = nativeEvent.touches[0];
		return {
			x: touch.clientX - rect.left,
			y: touch.clientY - rect.top
		};
	}
	return null;
}

const preventDefaultOnCanvas = (e: Event) => {
	e.preventDefault();
}

const listenerTypes = ["touchstart", "touchmove", "touchend", "touchcancel", "mouseup", "mousedown", "mousemove", "mouseout"];

const addCanvasListeners = (canvas: HTMLCanvasElement) => {
	const nonPassive = { passive: false };
	listenerTypes.forEach(type => canvas.addEventListener(type, preventDefaultOnCanvas, nonPassive));
}

const removeCanvasListeners = (canvas: HTMLCanvasElement) => {
	listenerTypes.forEach(type => canvas.removeEventListener(type, preventDefaultOnCanvas));
}
