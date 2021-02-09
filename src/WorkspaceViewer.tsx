import React from "react";
import MessageComposer from "./MessageComposer";
import WorkspaceMessages from "./WorkspaceMessages";
import { useCurrentAuthor } from "react-earthstar";
import { LobbyContext } from "./util/lobby-context";

type WorkspaceViewerProps = {
  workspaceAddress: string;
};

const WorkspaceViewer: React.FC<WorkspaceViewerProps> = ({
  workspaceAddress,
}) => {
  const [currentAuthor] = useCurrentAuthor();

  return (
    <>
      {currentAuthor ? <MessageComposer workspace={workspaceAddress} /> : null}
      <WorkspaceMessages workspace={workspaceAddress} />
    </>
  );
};

export default WorkspaceViewer;
