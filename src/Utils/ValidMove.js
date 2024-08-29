export const validMove = (piece, wPieces, bPieces)=>{
    if(piece.name === 'pawn'){
        return validPawnMove(piece,wPieces,bPieces)
    }
    if(piece.name === 'rook') {
        return validRookMove(piece,wPieces,bPieces)
    }
    if(piece.name === 'bishop') {
        return validBishopMove(piece,wPieces,bPieces)
    }
    if(piece.name === 'knight') {
        return validKnightMove(piece,wPieces,bPieces)
    }
    if(piece.name === 'queen') {
        return validQueenMove(piece,wPieces,bPieces)
    }
    if(piece.name === 'king') {
        return validKingMove(piece,wPieces,bPieces)
    }
}

const validKingMove = (piece, wPieces, bPieces) => {
    let validPositions = [];
    const moves = [
        { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 },
        { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }
    ];

    moves.forEach(move => {
        let x = piece.x + move.x;
        let y = piece.y + move.y;
        if (x >= 0 && x <= 7 && y >= 0 && y <= 7) { // Within bounds
            if (piece.color == 1) {
                if (!wPieces.find(p => p.x == x && p.y == y)) { // Not occupied by own piece
                    validPositions.push({ x, y });
                }
            }
            else {
                if (!bPieces.find(p => p.x == x && p.y == y)) { // Not occupied by own piece
                    validPositions.push({ x, y });
                }
            }
        }
    });

    return validPositions;
};

const validQueenMove = (piece, wPieces, bPieces) => {
    let validPositions = [];
    const directions = [
        { x: 0, y: 1 }, { x: 0, y: -1 },
        { x: 1, y: 0 }, { x: -1, y: 0 },
        { x: 1, y: 1 }, { x: 1, y: -1 },
        { x: -1, y: 1 }, { x: -1, y: -1 }
    ];

    directions.forEach(direction => {
        let x = piece.x;
        let y = piece.y;
        if (piece.color == 1) {
            while (true) {
                x += direction.x;
                y += direction.y;
                if (x < 0 || x > 7 || y < 0 || y > 7) break; // Out of bounds
                if (wPieces.find(p => p.x == x && p.y == y)) break; // Blocked by own piece
                validPositions.push({ x, y });
                if (bPieces.find(p => p.x == x && p.y == y)) break; // Can capture opponent's piece but can't move further
            }
        }
        else {
            while (true) {
                x += direction.x;
                y += direction.y;
                if (x < 0 || x > 7 || y < 0 || y > 7) break; // Out of bounds
                if (bPieces.find(p => p.x == x && p.y == y)) break; // Blocked by own piece
                validPositions.push({ x, y });
                if (wPieces.find(p => p.x == x && p.y == y)) break; // Can capture opponent's piece but can't move further
            }
        }
    });

    return validPositions;
};

const validKnightMove = (piece, wPieces, bPieces) => {
    let validPositions = [];
    const moves = [
        { x: 2, y: 1 }, { x: 2, y: -1 },
        { x: -2, y: 1 }, { x: -2, y: -1 },
        { x: 1, y: 2 }, { x: 1, y: -2 },
        { x: -1, y: 2 }, { x: -1, y: -2 }
    ];

    moves.forEach(move => {
        let x = piece.x + move.x;
        let y = piece.y + move.y;
        if (piece.color == 1) {
            if (x >= 0 && x <= 7 && y >= 0 && y <= 7) { // Within bounds
                if (!wPieces.find(p => p.x == x && p.y == y)) { // Not occupied by own piece
                    validPositions.push({ x, y });
                }
            }
        }
        else {
            if (x >= 0 && x <= 7 && y >= 0 && y <= 7) { // Within bounds
                if (!bPieces.find(p => p.x == x && p.y == y)) { // Not occupied by own piece
                    validPositions.push({ x, y });
                }
            }
        }
    });

    return validPositions;
};

const validBishopMove = (piece, wPieces, bPieces) => {
    let validPositions = [];
    const directions = [
        { x: 1, y: 1 },   // up-right
        { x: 1, y: -1 },  // down-right
        { x: -1, y: 1 },  // up-left
        { x: -1, y: -1 }  // down-left
    ];

    directions.forEach(direction => {
        let x = piece.x;
        let y = piece.y;
        while (true) {
            x += direction.x;
            y += direction.y;
            if (piece.color == 1) {
                if (x < 0 || x > 7 || y < 0 || y > 7) break; // Out of bounds
                if (wPieces.find(p => p.x == x && p.y == y)) break; // Blocked by own piece
                validPositions.push({ x, y });
                if (bPieces.find(p => p.x == x && p.y == y)) break; // Can capture opponent's piece but can't move further
            }
            else {
                if (x < 0 || x > 7 || y < 0 || y > 7) break; // Out of bounds
                if (wPieces.find(p => p.x == x && p.y == y)) break; // Blocked by own piece
                validPositions.push({ x, y });
                if (bPieces.find(p => p.x == x && p.y == y)) break; // Can capture opponent's piece but can't move further
            }
        }
    });

    return validPositions;
};

const validRookMove = (piece, wPieces, bPieces) => {
    let validPositions = [];
    const directions = [
        { x: 0, y: 1 },  // up
        { x: 0, y: -1 }, // down
        { x: 1, y: 0 },  // right
        { x: -1, y: 0 }  // left
    ];
    if (piece.color == 1) {
        
    }
    const isOccupied = (x, y) => {
        return wPieces.find(p => p.x == x && p.y == y) || bPieces.find(p => p.x == x && p.y == y);
    };
    if (piece.color ==1 ) {
        directions.forEach(direction => {
            let x = piece.x;
            let y = piece.y;
            while (true) {
                x += direction.x;
                y += direction.y;
                if (x < 0 || x > 7 || y < 0 || y > 7) break; // Out of bounds
                if (wPieces.find(p => p.x == x && p.y == y)) break; // Blocked by own piece
                validPositions.push({ x, y });
                if (bPieces.find(p => p.x == x && p.y == y)) break; // Can capture opponent's piece but can't move further
            }
        });
    }
    else {
        directions.forEach(direction => {
            let x = piece.x;
            let y = piece.y;
            while (true) {
                x += direction.x;
                y += direction.y;
                if (x < 0 || x > 7 || y < 0 || y > 7) break; // Out of bounds
                if (bPieces.find(p => p.x == x && p.y == y)) break; // Blocked by own piece
                validPositions.push({ x, y });
                if (wPieces.find(p => p.x == x && p.y == y)) break; // Can capture opponent's piece but can't move further
            }
        });
    }
    return validPositions;
};

const validPawnMove = (piece, wPieces, bPieces)=>{
    let validPositions = []
    if (piece.color == 1) {
        if(piece.y == 0){
            piece.name = "queen"
            piece.figurePosition = 3;
        }
        let p1 = {
            x: piece.x,
            y: piece.y -1
        }
        if(!wPieces.find((p)=> p.x == p1.x && p.y == p1.y) &&
        !bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
            validPositions.push({...p1})
        if(piece.x > 0){
            p1.x = piece.x - 1
            if(bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
                validPositions.push({...p1})
        }
        if(piece.x <7 ){
            p1.x = piece.x + 1
            if(bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
                validPositions.push({...p1})
        }
        if(piece.y == 6 ){
            p1.x = piece.x
            p1.y = piece.y-2
            if(!wPieces.find((p)=> p.x == p1.x && p.y == p1.y) &&
            !bPieces.find((p)=> p.x == p1.x && p.y == p1.y))
                validPositions.push({...p1})
        }
    }
    else {
        if(piece.y == 7){
            piece.name = "queen"
            piece.figurePosition = 3;
        }
        let p1 = {
            x: piece.x,
            y: piece.y +1
        }
        if(!bPieces.find((p)=> p.x == p1.x && p.y == p1.y) &&
        !wPieces.find((p)=> p.x == p1.x && p.y == p1.y))
            validPositions.push({...p1})
        if(piece.x < 7){
            p1.x = piece.x - 1
            if(wPieces.find((p)=> p.x == p1.x && p.y == p1.y))
                validPositions.push({...p1})
        }
        if(piece.x <7 ){
            p1.x = piece.x + 1
            if(wPieces.find((p)=> p.x == p1.x && p.y == p1.y))
                validPositions.push({...p1})
        }
        if(piece.y == 1 ){
            p1.x = piece.x
            p1.y = piece.y+2
            if(!bPieces.find((p)=> p.x == p1.x && p.y == p1.y) &&
            !wPieces.find((p)=> p.x == p1.x && p.y == p1.y))
                validPositions.push({...p1})
        }
    }
    return validPositions
}