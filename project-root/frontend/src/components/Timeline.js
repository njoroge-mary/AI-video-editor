import React, { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { clipsState } from '../state/atoms';

export default function Timeline() {
  const [clips, setClips] = useRecoilState(clipsState);

  const onDragEnd = result => {
    if (!result.destination) return;
    const reordered = Array.from(clips);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setClips(reordered);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="timeline" direction="horizontal">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="h-32 flex overflow-x-auto">
            {clips.map((clip, idx) => (
              <Draggable key={clip.id} draggableId={clip.id} index={idx}>
                {prov => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    className="w-40 h-28 bg-gray-800 m-1 flex items-center justify-center text-white rounded"
                  >
                    Clip {idx + 1}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}