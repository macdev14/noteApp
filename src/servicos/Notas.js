import { db } from "./sqlite";

export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "Notas" +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);"
        )
    })
}

export function adicionaNota(nota){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
        transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto ) VALUES(?,?,?);",
         [nota.titulo, nota.categoria, nota.texto],
         ()=>{
            resolve("Nota adicionada com sucesso!");
         }
         )
    })  
    })
  
}

export async function atualizaNota(nota){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
        transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;",
         [nota.titulo, nota.categoria, nota.texto, nota.id],
         ()=>{
            resolve("Nota atualizada com sucesso!");
         }
         )
    })  
    })
  
}

export async function removeNota(nota){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
        transaction.executeSql("DELETE FROM Notas WHERE id = ?;",
         [nota.id],
         ()=>{
            resolve("Nota removida com sucesso!");
         }
         )
    })  
    })
  
}

export async function buscaNotas(){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
        transaction.executeSql("SELECT * FROM Notas;",
         [],
         (_, resultado)=>{
            console.log(resultado.rows._array);
            resolve(resultado.rows._array);
         }
         )
    })  
    })
  
}

export async function filtraPorCategoriaNotas(categoria){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
        transaction.executeSql("SELECT * FROM Notas WHERE categoria = ?;",
         [categoria],
         (_, resultado)=>{
            console.log(resultado.rows._array);
            resolve(resultado.rows._array);
         }
         )
    })  
    })
  
}