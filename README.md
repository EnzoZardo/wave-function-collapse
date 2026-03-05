# Wave Functio Collapse
Algoritmo de Wave Function Collapse desenvolvido para a matéria de Inteligência Artificial.

O algoritmo foi desenhado com base no seguinte pseudo-código:

```

CONSTANTE TILES = { AGUA, GRAMA, MONTANHA }

FUNÇÃO regrasCompativeis(tileA, tileB):
    SE tileA == AGUA:
        RETORNE tileB == AGUA OU tileB == GRAMA

    SE tileA == GRAMA:
        RETORNE VERDADEIRO

    SE tileA == MONTANHA:
        RETORNE tileB == GRAMA

FIM FUNÇÃO

FUNÇÃO criarGrade(largura, altura):

    grade = matriz[largura][altura]

    PARA cada posição (x, y):
        grade[x][y].possibilidades = cópia de TILES
        grade[x][y].colapsado = FALSO

    RETORNE grade

FUNÇÃO menorEntropia(grade):

    menor = INFINITO
    escolhida = NULO

    PARA cada célula na grade:
        SE célula NÃO colapsada:
            tamanho = quantidade de possibilidades

            SE tamanho < menor E tamanho > 0:
                menor = tamanho
                escolhida = célula

    RETORNE escolhida

FUNÇÃO colapsar(célula):

    escolha = escolherAleatorio(célula.possibilidades)

    célula.possibilidades = { escolha }
    célula.colapsado = VERDADEIRO

FUNÇÃO propagar(grade, célulaInicial):

    fila = novaFila()
    enfileirar(fila, célulaInicial)

    ENQUANTO fila NÃO vazia:

        célula = desenfileirar(fila)

        PARA cada vizinho da célula:

            SE vizinho colapsado:
                CONTINUE

            possibilidadesValidas = conjunto vazio

            PARA cada tileVizinho em vizinho.possibilidades:
                valido = FALSO

                PARA cada tileAtual em célula.possibilidades:
                    SE regrasCompativeis(tileAtual, tileVizinho):
                        valido = VERDADEIRO

                SE valido:
                    adicionar tileVizinho em possibilidadesValidas

            SE possibilidadesValidas mudou:
                vizinho.possibilidades = possibilidadesValidas
                enfileirar(fila, vizinho)

FUNÇÃO waveFunctionCollapse(largura, altura):

    grade = criarGrade(largura, altura)

    ENQUANTO existir célula não colapsada:

        célula = menorEntropia(grade)

        SE célula é NULO:
            ERRO: sem solução válida

        colapsar(célula)

        propagar(grade, célula)

    RETORNE grade

waveFunctionCollapse(<width>, <height>)


```

Após isso, foi repassado para um código Python para uma fase experimental:

```python
import sys
import random
TILES = ['$', '#', '^']
NEIGHBOR = [-1, 0, 1]

class Tile:
    x: int
    y: int
    possibilities: list[str]
    collapsed: bool

    def __init__(self, x: int, y: int, possibilities: list[str]):
        self.x = x
        self.y = y
        self.collapsed = False
        self.possibilities = possibilities


# aqui a gente define as regras a serem seguidas
def compatibleRules(tileA: str, tileB: str) -> bool:
    if tileA == '$':
        return tileA == '$' or tileB  == '#'
    
    if tileA == '#':
        return True
    
    if tileA == '^':
        return tileB == '#'
    
    return tileB == '#'

def buildBoard(width: int, height: int) -> list[list[Tile]]:
    board: list[list[Tile]] = [[Tile(x, y, TILES) for x in range(width)] for y in range(height)]
    return board;

def lessEntropy(board: list[list[Tile]]) -> Tile | None:
    size: int | None = 0
    less: int = sys.maxsize
    chosen: Tile | None = None

    for y in board:
        for x in y:
            if not x.collapsed:
                size = len(x.possibilities)
            
            if size < less and size > 0:
                less = size
                chosen = x

    return chosen

def collapse(cell: Tile):
    choice = random.choice(TILES)
    cell.possibilities = [choice]
    cell.collapsed = True

def propagate(board: list[list[Tile]], start_cell: Tile) -> None:
    queue: list[Tile] = [start_cell]

    while len(queue) > 0:
        cell = queue.pop(0)

        for y in NEIGHBOR:
            for x in NEIGHBOR:
                curY: int = cell.y + y
                curX: int = cell.x + x
                if (curY < 0 or curY >= len(board) or curX < 0 or curX >= len(board[0])):
                    continue

                cur: Tile = board[curY][curX]
                if cur in board:
                    if cur.collapsed:
                        continue;

                    validPossibilities: list[str] = []

                    for neighborTile in cur.possibilities:
                        valid = False
                        if compatibleRules(neighborTile, cur.possibilities[0]):
                            valid = True

                        if valid:
                            validPossibilities.append(neighborTile)
                        
                    if len(validPossibilities) > 0:
                        cur.possibilities = validPossibilities
                        queue.append(cur)

def hasNoCollapsed(board: list[list[Tile]]) -> bool:
    for row in board:
        for cell in row:
            if not cell.collapsed: 
                return True

    return False

def waveFunctionCollapse(width: int, height: int) -> list[list[Tile]]:
    board: list[list[Tile]] = buildBoard(width, height)

    while hasNoCollapsed(board):
        cell = lessEntropy(board)

        if cell == None:
            raise ValueError("Sem solução válida");

        collapse(cell)
        propagate(board, cell)

    return board

for y in waveFunctionCollapse(10, 10):
    print('')
    for x in y:
        print(x.possibilities[0], end="")

```

E por fim, chegamos em nossa versão principal, neste repositório.

As instruções para execução do código são:

Ter o **npm** instalado na máquina.

### Clonar o repositório
```bash
git clone https://github.com/EnzoZardo/wave-function-collapse.git
cd wave-function-collapse
```

Instalar as dependências:
```bash
npm i
```

E, por fim, executar com o comando: 
```bash
npm start
```
