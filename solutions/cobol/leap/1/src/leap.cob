       IDENTIFICATION DIVISION.
       PROGRAM-ID. LEAP.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-YEAR             PIC 9(4).
       01 WS-IS-LEAP          PIC 9 VALUE 0.
       01 WS-RESULT           PIC 9.
       01 WS-REM-4            PIC 9(4).
       01 WS-REM-100          PIC 9(4).
       01 WS-REM-400          PIC 9(4).
       PROCEDURE DIVISION.
       LEAP.
         DIVIDE WS-YEAR BY 4 GIVING WS-REM-4 REMAINDER WS-REM-4.
         DIVIDE WS-YEAR BY 100 GIVING WS-REM-100 REMAINDER WS-REM-100.
         DIVIDE WS-YEAR BY 400 GIVING WS-REM-400 REMAINDER WS-REM-400.
         
         IF WS-REM-4 = 0
            IF WS-REM-100 = 0
               IF WS-REM-400 = 0
                  MOVE 1 TO WS-IS-LEAP
               ELSE
                  MOVE 0 TO WS-IS-LEAP
               END-IF
            ELSE
               MOVE 1 TO WS-IS-LEAP
            END-IF
         ELSE
            MOVE 0 TO WS-IS-LEAP
         END-IF.
         
         MOVE WS-IS-LEAP TO WS-RESULT.
       
       LEAP-EXIT.
         EXIT.