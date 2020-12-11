using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebApi.Models
{
    public class Aluno
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public string Telefone { get; set; }
        public int Ra { get; set; }


        public List<Aluno> ListarAlunos ()
        {
            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");
            var json = File.ReadAllText(caminhoArquivo);
            List<Aluno> listaDeAlunos = JsonConvert.DeserializeObject<List<Aluno>>(json);

            return listaDeAlunos;
        }

        public  bool ReescreverArquivo(List<Aluno> listAlunos) 
        {
            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/Base.json");

            var json = JsonConvert.SerializeObject(listAlunos, Formatting.Indented);
            File.WriteAllText(caminhoArquivo, json);

            return true;
        }


        public  Aluno Inserir(Aluno aluno)
        {
            var listaDeAlunos = ListarAlunos();

            var maxId = listaDeAlunos.Max(al => al.Id);
            aluno.Id = maxId + 1;
            listaDeAlunos.Add(aluno);

            ReescreverArquivo(listaDeAlunos);
            return aluno;
        }

        public Aluno Atualizar (int id, Aluno aluno) 
        {
            var listaDeAlunos = ListarAlunos();

            var itemIndex = listaDeAlunos.FindIndex(al => al.Id == aluno.Id);

            if (itemIndex >= 0) 
            {
                aluno.Id = id;
                listaDeAlunos[itemIndex] = aluno;
            }
            else{
                return null;
            }

            ReescreverArquivo(listaDeAlunos);
            return aluno;
        }

        public bool Deletar(int id)
        {
            var listaDeAlunos = ListarAlunos();

            var itemIndex = listaDeAlunos.FindIndex(al => al.Id == id);

            if (itemIndex >= 0)
            {
                listaDeAlunos.RemoveAt(itemIndex);
            }
            else{
                return false;
            }

            ReescreverArquivo(listaDeAlunos);
            return true;
             
        }
    }
}