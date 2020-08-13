import React from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { WorkspaceMessages_workspace } from "./__generated__/WorkspaceMessages_workspace.graphql";
import Message from "./Message";
import { AuthorKeypair } from "earthstar";
import { css } from "styled-components/macro";

type WorkspaceMessagesProps = {
  workspace: WorkspaceMessages_workspace;
  relay: RelayProp;
  author: AuthorKeypair | null;
  setHasLocalWorkspaceChanges: (hasChanges: boolean) => void;
  stickAt: number;
};

const WorkspaceMessages: React.FC<WorkspaceMessagesProps> = ({
  workspace,
  author,
  setHasLocalWorkspaceChanges,
  stickAt,
}) => {
  const docsByDate = workspace.documents.reduce((acc, doc) => {
    if (!doc.timestamp) {
      return acc;
    }

    const docDate = new Date(doc.timestamp / 1000);
    const docDateString = docDate.toDateString();
    const accDateCollection = acc[docDateString] || [];

    return {
      ...acc,
      [docDateString]: [...accDateCollection, doc],
    };
  }, {} as Record<string, WorkspaceMessages_workspace["documents"][0][]>);

  return (
    <div>
      {Object.keys(docsByDate).map((key) => {
        const date = new Date(Date.parse(key));
        const title = date.toLocaleDateString(["en-en"], {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const documents = docsByDate[key];

        return (
          <section key={key}>
            <div
              css={css`
                position: sticky;
                top: ${stickAt}px;
                z-index: 0;
                background: ${(props) => props.theme.colours.bg};
                border-bottom: 1px solid
                  ${(props) => props.theme.colours.fgHint};
                padding: 12px 8px;
                display: flex;
                justify-content: center;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
              `}
            >
              <div>
                <b>{title}</b>
              </div>
            </div>
            <ol
              css={css`
                padding: 0;
                margin: 0;
              `}
            >
              {documents.map((doc) => {
                return (
                  <>
                    <Message
                      key={doc.id}
                      setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
                      author={author}
                      document={doc}
                    />
                    <hr
                      css={css`
                        border-top: 1px solid
                          ${(props) => props.theme.colours.fgHint};
                      `}
                    />
                  </>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
};

export default createFragmentContainer(WorkspaceMessages, {
  workspace: graphql`
    fragment WorkspaceMessages_workspace on Workspace {
      address
      documents(sortedBy: NEWEST) {
        ...Message_document
        ... on ES4Document {
          id
          timestamp
        }
      }
    }
  `,
});
